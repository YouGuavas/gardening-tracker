import '../styles/Plants.scss';
import {Link} from 'react-router-dom';
import { getPlantsByType, getPlantByName, updateCount, getGardenPlants } from '../utils/api';
import { useState, useEffect } from 'react';
import { Paginator } from './Paginator';


//**** Plants *****//
export function Plants(props) {
  const plants = props.plants;
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const floor = (page - 1) * resultsPerPage;
  const ceiling = page * resultsPerPage;
  const [pagination, setPagination] = useState({bottom: page, top: 9, resultsPerPage: resultsPerPage});
  

  const handleClick = async (plantName, count) => {
    await updateCount({username: props.userName, plant: plantName, count: count})
    await props.fetchGardenData(props.userName);
  }
  const renderGardenButtons = (haveThisPlant, plantName) => {
    if (props.isLoggedIn) {
      if (haveThisPlant) {
        return <button onClick={() => handleClick(plantName, props.gardenPlants[plantName]+1)} className='garden-button'>Increase: {props.gardenPlants[plantName]}</button>
      } else {
        return <button onClick={() => handleClick(plantName, 1)} className='garden-button'>Add to Garden</button>
      }
    }
  }

  useEffect(() => {
    props.setPlantList();
  }, [props.plants.length])

  return (
    <div className="main plant-grid grid long">
      <h1>Info</h1>
      <ul className="plants">
      {plants.slice(floor,ceiling).map((plant, index) => {
        if (index < resultsPerPage) {
          const haveThisPlant = Object.keys(props.gardenPlants).indexOf(plant.name) !== -1;
          return <li key={index}><Link onClick={() => props.setPlant(plant)} to={`/info/${plant.name}`}>
            <PlantCard name={plant.name} heat={plant.heat} maturity={plant.maturity}/>
            </Link>
            {renderGardenButtons(haveThisPlant, plant.name)}
            </li>
        }
      })}
      </ul>
      <Paginator plants={plants.length} pagination={pagination} page={{"page": page, "setPage": setPage}}/>
    </div>
  )
}


//**** Plant *****//
export function Plant(props) {
  const plant = props.plant;
  //const haveThisPlant = Object.keys(props.gardenPlants).indexOf(plant.name) !== -1;
  const stuffToCheckFor = [
    {name: 'heat', message: 'Heat:'}, 
    {name: 'maturity', message: 'Time to maturity:', optional: 'days'},
    {name: 'plantcolor', message: 'Plant color:'},
    {name: 'podcolor', message: 'Pod color:'}
    ];
  const renderGardenButtons = (haveThisPlant) => {
    if (props.isLoggedIn) {
      if (haveThisPlant) {
        return <button className='garden-button'>Increase</button>
      } else {
        return <button className='garden-button'>Add to Garden</button>
      }
    }
  }
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
      {renderGardenButtons()}
      
      
      {
      stuffToCheckFor.map((item) =>  renderPlantData(item.name, item.message, item.optional ? item.optional : null))
      }

    </div>
  )
}



//**** PlantCard *****//
function PlantCard(props) {
  return(
    <div className="card">
      <h4>{props.name}</h4> 
      {(props.heat && props.heat != '",') ? <p>{props.heat}</p> : null}
    </div>
  )
}