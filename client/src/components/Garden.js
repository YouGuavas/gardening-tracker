import {useState} from 'react';

import {Link} from 'react-router-dom';

import { updateCount, getGardenPlants } from '../utils/api';

import '../styles/Garden.scss';

export function Garden(props) {
  const plants = props.plants;

  return (
    <div className="main garden-grid">
      {(plants) ? Object.keys(plants).map((item, index) => {
        return <GardenCard key={index} userName={props.userName} plants={plants} name={item} count={plants[item]} />
      }) : null
      }
      
    </div> 
  
  )
}

function GardenCard(props) {
  const plant = props.name;

  const [count, setCount] = useState(props.count);
  const [expectedYield, setExpectedYield] = useState(0);
  const handleMath = async (operation) => {
    if (operation === 'plus'){
      await setCount(count+1);
      updateCount({username: props.userName, plant: plant, count: count+1})

    } else {
      if (count > 0) {
        await setCount(count-1);
        updateCount({username: props.userName, plant: plant, count: count-1})
      }
    }

  }
  return (
    <div className="garden-card">
      <div className="flex-card">
        <button onClick={() => handleMath('minus')}>-</button>
        <div className="link-container"><Link to={`/info/${plant}`}>{plant}: {count}</Link></div>
        <button onClick={() => handleMath('plus')}>+</button>
      </div>
      <div className="bottom-portion">
        <div>Expected Yield Per Plant: <input className="garden-input" type="text" onChange={(e) => setExpectedYield(e.target.value)}/></div>
        <div>Total Expected Yield: {count * expectedYield}</div>
      </div>
    </div>
  )
}