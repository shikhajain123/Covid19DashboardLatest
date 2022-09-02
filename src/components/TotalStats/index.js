import {Link} from 'react-router-dom'
import './index.css'

const TotalStats = ({key, stateDetails}) => {
  //   const  = props
  const {
    stateName,
    confirmed,
    deceased,
    recovered,
    population,
    stateCode,
    other,
  } = stateDetails

  const active = confirmed - recovered - deceased - other

  return (
    <Link to={`/state/${stateCode}`}>
      <li className="other-state-tables-bar">
        <div className="other-tables-bar">
          <p className="state-ut-heading">{stateName}</p>
        </div>
        <div className="other-tables-bar">
          <p className="state-ut-heading">{confirmed}</p>
        </div>
        <div className="other-tables-bar">
          <p className="state-ut-heading">{active}</p>
        </div>
        <div className="other-tables-bar">
          <p className="state-ut-heading">{recovered}</p>
        </div>
        <div className="other-tables-bar">
          <p className="state-ut-heading">{deceased}</p>
        </div>
        <div className="other-tables-bar">
          <p className="state-ut-heading">{population}</p>
        </div>
      </li>
    </Link>
  )
}

export default TotalStats
