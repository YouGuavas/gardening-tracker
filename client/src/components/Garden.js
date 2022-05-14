import {Link} from 'react-router-dom';

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
  let count = props.count;
  const handleMath = (operation) => {
    if (operation === 'plus'){
      props.plants.map((item) => {
        if (item.name  === plant) console.log('hi')
      })
    } 
  }
  return (
    <div className="card flex-card">
      <button onClick={() => handleMath('minus')}>-</button>
      <div><Link to={`/info/${plant}`}>{plant}: {count}</Link></div>
      <button onClick={() => handleMath('plus')}>+</button>
    </div>
  )
}