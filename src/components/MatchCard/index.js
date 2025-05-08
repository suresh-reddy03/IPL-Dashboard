// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    result,
    matchStatus,
  } = matchCardDetails
  const resultColor = matchStatus === 'Lost' ? 'lost' : 'win'

  return (
    <li className="match-card-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="card-team-logo"
      />
      <p className="team-name">{competingTeam}</p>
      <p className="team-result">{result}</p>
      <p className={`match-status ${resultColor}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
