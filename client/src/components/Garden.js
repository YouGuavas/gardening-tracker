import {useState} from 'react';

import {Link} from 'react-router-dom';

import { updateCount, testCount, getGardenPlants } from '../utils/api';
import { useEffect } from 'react';

import '../styles/Garden.scss';

export function Garden(props) {
  const plants = props.plants.plants;
  const setPlants = props.plants.setPlants;

  useEffect(() => {
    props.plants.fetchGardenData();
  }, [typeof props.plants.plants])

  return (
    <div className="main">
      {(plants) ? Object.keys(plants).map((item) => {
        return <GardenCard plants={plants} name={item} count={plants[item]} />
      }) : null
      }
      
    </div> 
  
  )
}

function GardenCard(props) {
  const plant = props.name;

  const [count, setCount] = useState(props.count);
  const [expectedYield, setExpectedYield] = useState(0);
  const handleMath = (operation) => {
    if (operation === 'plus'){
      setCount(count+1);
    } else {
      if (count > 0) setCount(count-1);
    }
  }
  return (
    <div className="garden-card">
      <div className="flex-card">
        <button onClick={() => handleMath('minus')}>-</button>
        <div><Link to={`/info/${plant}`}>{plant}: {count}</Link></div>
        <button onClick={() => handleMath('plus')}>+</button>
      </div>
      <div>
        <div>Expected Yield Per Plant: <input type="text" onChange={(e) => setExpectedYield(e.target.value)}/></div>
        <div>Total Expected Yield: {count * expectedYield}</div>
      </div>
    </div>
  )
}