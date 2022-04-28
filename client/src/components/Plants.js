import '../styles/Plants.scss';
import {Link} from 'react-router-dom';
import { getPlantsByType } from '../utils/api';
import { useState, useEffect } from 'react';

export function Plants(props) {
  const [plants, setPlants] = useState([]);

  async function setPlantList() {
    const plantList = await getPlantsByType("peppers");
    setPlants(plantList);
  }
  useEffect(() => {
    setPlantList();
  }, [plants.length])
  return (
      <div className="main plant-grid grid long">
      <h1>Info</h1>
      <ul className="plants">
      {plants.map((plant, index) => {
        return <li><Link onClick={() => props.setPlant(plant)} to={`/info/${plant.name}`} key={index}><PlantCard name={plant.name} maturity={plant.maturity}/></Link></li>
      })}
      </ul>
    </div>
  )
}

export function Plant(props) {
  const plant = props.plant;
  return(
    <div className="main">
      <h1>{plant.name ? plant.name : "unknown"}</h1>
      {plant.heat ? <p>Heat: {plant.heat}</p> : null}
      {plant.maturity ? <p>Time to maturity: {plant.maturity} days</p> : null}
      {plant.plantcolor ? <p>Plant color: {plant.plantcolor}</p> : null}
      {plant.podcolor ? <p>Pod color: {plant.podcolor}</p> : null}

    </div>
  )
}

function PlantCard(props) {
  return(
    <div className="card">
      <h4>{props.name}</h4> 
      {props.maturity}
    </div>
  )
}