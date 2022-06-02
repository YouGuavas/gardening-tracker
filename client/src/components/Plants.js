import '../styles/Plants.scss';
import {Link} from 'react-router-dom';
import { updateCount } from '../utils/api';
import { useState, useEffect } from 'react';
import { Paginator } from './Paginator';


//**** Plants *****//
export function Plants(props) {
  const plants = props.plants;
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const floor = (page - 1) * resultsPerPage;
  const ceiling = page * resultsPerPage;
  const [pagination, setPagination] = useState({bottom: page, top: 9, resultsPerPage: resultsPerPage});
  
  //const token = JSON.parse(localStorage['gardeningTrackerLogin']).token;
  const handleClick = async (plantName, count) => {
    await updateCount({plant: plantName, count: count})
    await props.fetchGardenData();
  }
  const renderGardenButtons = (haveThisPlant, plantName) => {
    if (isLoggedIn) {
      if (haveThisPlant === true) {
        return (
        <div className="flex">
          <button onClick={() => handleClick(plantName, props.gardenPlants[plantName]-1)} className='garden-button'>-</button>
          <div>{props.gardenPlants[plantName]}</div>
          <button onClick={() => handleClick(plantName, props.gardenPlants[plantName]+1)} className="garden-button">+</button>
        </div>
        )
      } else {
        return <button onClick={() => handleClick(plantName, 1)} className='garden-button'>Add to Garden</button>
      }
    }
  }

  useEffect(() => {
    props.setPlantList();
  }, [props.plants.length])

  useEffect(() => {
    if (localStorage['gardeningTrackerLogin']) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn])

  return (
    <div className="main plant-grid grid long">
      <h1>Info</h1>
      <ul className="plants">
      {plants.slice(floor,ceiling).map((plant, index) => {
        if (index < resultsPerPage) {
          let haveThisPlant;
          if (props.isLoggedIn && props.gardenPlants) haveThisPlant = (Object.keys(props.gardenPlants).indexOf(plant.name) !== -1);
          if (haveThisPlant) if (props.gardenPlants[plant.name] < 1) haveThisPlant = false;
          //logic for determining whether we have this plant in our garden


          return <li key={index}><Link onClick={() => props.setPlant(plant)} to={`/info/${plant.name}`}>
            <PlantCard name={plant.name} heat={plant.heat} maturity={plant.maturity}/>
            </Link>
            {isLoggedIn ? renderGardenButtons(haveThisPlant, plant.name) : null}
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
  const [isLoggedIn, setIsLoggedIn] = useState();
  const stuffToCheckFor = [
    {name: 'heat', message: 'Heat:'}, 
    {name: 'maturity', message: 'Time to maturity:', optional: 'days'},
    {name: 'plantcolor', message: 'Plant color:'},
    {name: 'podcolor', message: 'Pod color:'}
    ];


  const handleClick = async (plantName, count) => {
    await updateCount({username: props.userName, plant: plantName, count: count})
    await props.fetchGardenData(props.userName);
  }
  const renderGardenButtons = () => {
    let haveThisPlant = false;
    
    if ((typeof props.gardenPlants === 'object') && props.gardenPlants && plant) haveThisPlant = Object.keys(props.gardenPlants).indexOf(plant.name) !== -1;
    if (haveThisPlant) if (props.gardenPlants[plant.name] < 1) haveThisPlant = false;
    //logic for determining whether we have this plant in our garden

    if (props.isLoggedIn) {
      if (haveThisPlant) {
        return (
        <div className="flex">
          <button onClick={() => handleClick(plant.name, props.gardenPlants[plant.name]-1)} className='garden-button'>-</button>
          <div>{props.gardenPlants[plant.name]}</div>
          <button onClick={() => handleClick(plant.name, props.gardenPlants[plant.name]+1)} className="garden-button">+</button>
        </div>
        )
      } else {
        return <button onClick={() => handleClick(plant.name, 1)} className='garden-button'>Add to Garden</button>
      }
    }
  }
  const renderPlantData = (item, phrase, key, optional) => {
    if (plant) {
      if (plant[item]) if (plant[item] !== '",') return <p key={key}>{`${phrase} ${plant[item]} ${optional ? optional : ''}`}</p>
    }
  }
  
  useEffect(() => {
      props.setPlant('peppers', window.location.pathname.split('/')[2]);
  }, [typeof props.plant]);

  useEffect(() => {
    if (localStorage['gardeningTrackerLogin']) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn])
  
  useEffect(() => {
    props.fetchGardenData(props.userName);
  }, [typeof props.gardenPlants])
  return(
    <div className="main">
      <h1>{plant ? plant.name : "unknown"}</h1>
      {renderGardenButtons()}
      {
      stuffToCheckFor.map((item, index) =>  renderPlantData(item.name, item.message, index, item.optional ? item.optional : null))
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