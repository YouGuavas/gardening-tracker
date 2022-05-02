import '../styles/Plants.scss';
import {Link} from 'react-router-dom';
import { getPlantsByType } from '../utils/api';
import { useState, useEffect } from 'react';
import { Paginator } from './Paginator';

export function Plants(props) {
  const [plants, setPlants] = useState([]);
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const floor = (page - 1) * resultsPerPage;
  const ceiling = page * resultsPerPage;
  const [pagination, setPagination] = useState({bottom: page, top: 9, resultsPerPage: resultsPerPage});
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
      {plants.slice(floor,ceiling).map((plant, index) => {
        if (index < resultsPerPage){
        return <li><Link onClick={() => props.setPlant(plant)} to={`/info/${plant.name}`} key={index}><PlantCard name={plant.name} maturity={plant.maturity}/></Link></li>
        }
      })}
      </ul>
      <Paginator plants={plants.length} pagination={pagination} page={{"page": page, "setPage": setPage}}/>
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
      <p>{props.maturity}</p>
    </div>
  )
}