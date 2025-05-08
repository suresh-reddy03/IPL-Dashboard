// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatchDetails: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        competingTeam: data.latest_match_details.competing_team,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        result: data.latest_match_details.result,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        umpires: data.latest_match_details.umpires,
      },
      recentMatches: data.recent_matches.map(iplMatch => ({
        id: iplMatch.id,
        competingTeam: iplMatch.competing_team,
        competingTeamLogo: iplMatch.competing_team_logo,
        result: iplMatch.result,
        matchStatus: iplMatch.match_status,
      })),
    }
    this.setState({teamMatchDetails: updatedData, isLoading: false})
  }

  render() {
    const {teamMatchDetails, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchDetails

    return (
      <div className="team-match-details-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="page-info-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner-img"
            />
            <h1 className="latest-matches-heading">Latest Matches</h1>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="recent-matches-container">
              {recentMatches.map(item => (
                <MatchCard key={item.id} matchCardDetails={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
