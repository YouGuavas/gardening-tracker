import '../styles/Plants.scss';
import {Link} from 'react-router-dom';

export function Plants(props) {
  const handleClick = (plant) => {
    props.setPlant(plant);
  }
  return (
    <div className="main">
      {props.plants.map((plant, index) => {
        return <Link onClick={() => handleClick({name: plant.name, description: plant.description})} to={`/plant/${plant.name}`} key={index}>{plant.name}</Link>
      })}
    </div>
  )
}

export function Plant(props) {
  return(
    <div className="main">
      <h1>{props.plant.name}</h1>
      <p>{props.plant.description}</p>

    </div>
  )
}