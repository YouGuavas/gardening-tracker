import {useState} from 'react';

import {Link} from 'react-router-dom';

import { updateCount, testCount } from '../utils/api';

import '../styles/Garden.scss';

export function Garden(props) {
  const plants = props.plants.plants;
  const setPlants = props.plants.setPlants;
  return (
    <div className="main">
      {plants.map((item) => {
        return <GardenCard plants={plants} name={item.plant} count={item.count} />
      })
      }
      
    </div> 
  
  )
}

function GardenCard(props) {
  const plant = props.name;

  const [count, setCount] = useState(props.count);
  const handleMath = (operation) => {
    if (operation === 'plus'){
      setCount(count+1);
    } else {
      if (count > 0) setCount(count-1);
    }
  }
  return (
    <div className="garden-card">
      <button onClick={testCount}>test</button>
      <div className="flex-card">
        <button onClick={() => handleMath('minus')}>-</button>
        <div><Link to={`/info/${plant}`}>{plant}: {count}</Link></div>
        <button onClick={() => handleMath('plus')}>+</button>
      </div>
      <div>
        <div>Expected Yield Per Plant: <input type="text"/></div>
        <div>Total Expected Yield: </div>
      </div>
    </div>
  )
}