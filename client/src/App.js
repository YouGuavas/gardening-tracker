import './styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react';

import {Nav} from './components/Nav';
import {Plants, Plant} from './components/Plants';
import {Home} from './components/Home';
import {Garden} from './components/Garden';
import {Login} from './components/Login';

function App() {
  const [plant, setPlant] = useState('');
  const [gardenPlants, setGardenPlants] = useState([{plant: 'Jalapeno', count: 5}, {plant: 'Habanero', count: 3}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Nav links={['Home', 'Info', 'Garden']} classes="my-nav" isLoggedIn={isLoggedIn}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/info" element={<Plants setPlant={setPlant}/>} />
          <Route path="/info/:plant" element={<Plant plant={plant} setPlant={setPlant}/>}/>
          <Route path="/plants" element={<Plants setPlant={setPlant}/>}/>
          <Route path="/garden" element={<Garden plants={gardenPlants} />} />
          <Route path="/register" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
