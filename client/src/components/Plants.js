import '../styles/Plants.scss';
import {Link} from 'react-router-dom';
import { getPlantsByType, getPlantByName } from '../utils/api';
import { useState, useEffect } from 'react';
import { Paginator } from './Paginator';

export function Plants(props) {
  const plants = props.plants;
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const floor = (page - 1) * resultsPerPage;
  const ceiling = page * resultsPerPage;
  const [pagination, setPagination] = useState({bottom: page, top: 9, resultsPerPage: resultsPerPage});
  
  useEffect(() => {
    props.setPlantList();
  }, [props.plants.length])
  return (
    <div className="main plant-grid grid long">
      <h1>Info</h1>
      <ul className="plants">
      {plants.slice(floor,ceiling).map((plant, index) => {
        if (index < resultsPerPage){
        return <li key={index}><Link onClick={() => props.setPlant(plant)} to={`/info/${plant.name}`}><PlantCard isLoggedIn={props.isLoggedIn} name={plant.name} heat={plant.heat} maturity={plant.maturity}/></Link></li>
        }
      })}
      </ul>
      <Paginator plants={plants.length} pagination={pagination} page={{"page": page, "setPage": setPage}}/>
    </div>
  )
}

export function Plant(props) {
  const plant = props.plant;
  
  const stuffToCheckFor = [
    {name: 'heat', message: 'Heat:'}, 
    {name: 'maturity', message: 'Time to maturity:', optional: 'days'},
    {name: 'plantcolor', message: 'Plant color:'},
    {name: 'podcolor', message: 'Pod color:'}
    ];
  
  

  const renderPlantData = (item, phrase, optional) => {
    if (plant) {
      if (plant[item]) if (plant[item] !== '",') return <p>{`${phrase} ${plant[item]} ${optional ? optional : ''}`}</p>
    }
  }
  

  useEffect(() => {
    props.setPlant('peppers', window.location.pathname.split('/')[2])
  }, [typeof props.plant]);
  return(
    <div className="main">
      <h1>{plant ? plant.name : "unknown"}</h1>
      {props.isLoggedIn ? <p>Add</p> : null}
      {
      stuffToCheckFor.map((item) =>  renderPlantData(item.name, item.message, item.optional ? item.optional : null))
      }

    </div>
  )
}

function PlantCard(props) {
  return(
    <div className="card">
      <h4>{props.name}</h4> 
      {(props.heat && props.heat != '",') ? <p>{props.heat}</p> : null}
      {(props.isLoggedIn) ? <p>Add</p> : null}
    </div>
  )
}