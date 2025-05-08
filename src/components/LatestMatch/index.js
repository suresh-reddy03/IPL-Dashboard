// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props

  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails

  return (
    <div className="latest-match-details-container">
      <div className="basic-details">
        <p className="team-name">{competingTeam}</p>
        <p className="match-date">{date}</p>
        <p className="match-venue">{venue}</p>
        <p className="match-result">{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="team-logo"
      />
      <div className="match-details">
        <p className="text">First Innings</p>
        <p className="text-value">{firstInnings}</p>
        <p className="text">Second Innings</p>
        <p className="text-value">{secondInnings}</p>
        <p className="text">Man Of The Match</p>
        <p className="text-value">{manOfTheMatch}</p>
        <p className="text">Umpires</p>
        <p className="text-value">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
