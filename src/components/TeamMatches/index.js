// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const colors = {
  Won: '#00C49F',
  Lost: '#FF8042',
  Drawn: '#8884d8',
}

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
    if (response.ok) {
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
      console.log(updatedData)
      this.setState({teamMatchDetails: updatedData, isLoading: false})
    }
  }

  getMatchStats = recentMatches => {
    let won = 0
    let lost = 0
    let drawn = 0

    recentMatches.forEach(match => {
      if (match.matchStatus === 'Won') {
        won += 1
      } else if (match.matchStatus === 'Lost') {
        lost += 1
      } else {
        drawn += 1
      }
    })

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]
  }

  onClickBackBtn = () => {
    const {history} = this.props
    history.replace('/')
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
            <button
              type="button"
              className="back-btn"
              onClick={this.onClickBackBtn}
            >
              Back
            </button>
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
            <div className="match-stats-chart">
              <h1 className="chart-heading">Match Statistics</h1>
              <PieChart width={400} height={300}>
                <Pie
                  data={this.getMatchStats(recentMatches)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {this.getMatchStats(recentMatches).map(entry => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={colors[entry.name]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
