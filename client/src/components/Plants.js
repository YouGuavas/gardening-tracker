import '../styles/Plants.scss';
import {Link} from 'react-router-dom';

export function Plants(props) {
  return (
    <div className="main grid">
      <h1>Info</h1>
      <ul className="plants">
      {props.plants.map((plant, index) => {
        return <li><Link onClick={() => props.setPlant(plant)} to={`/info/${plant.name}`} key={index}>{plant.name}</Link></li>
      })}
      </ul>
    </div>
  )
}

export function Plant(props) {
  return(
    <div className="main">
      <h1>{props.plant.name}</h1>
      <p>Type: {props.plant.kind}</p>
      <p>{props.plant.description}</p>

    </div>
  )
}