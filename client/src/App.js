import './styles/App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

import { getGardenPlants } from './utils/api';

import {Nav} from './components/Nav';
import {Plants, Plant} from './components/Plants';
import {Home} from './components/Home';
import {Garden} from './components/Garden';
import {Login, AlreadyLoggedIn} from './components/Login';

function App() {

  const [plant, setPlant] = useState('');
  const [gardenPlants, setGardenPlants] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    console.log(status);
    localStorage.setItem('gardeningTrackerLogin', JSON.stringify({'loggedIn': status}));
  }
  const fetchGardenData = async () => {
    const localPlants = await getGardenPlants();
    setGardenPlants(localPlants);
  }
  useEffect(() => {
    if (localStorage['gardeningTrackerLogin']) setIsLoggedIn(JSON.parse(localStorage['gardeningTrackerLogin']).loggedIn);
  }, [isLoggedIn])

  useEffect(() => {
    fetchGardenData();
  }, [typeof gardenPlants])
  
  return (
    <div className="App">
      <Nav links={['home', 'info']} classes="my-nav" isLoggedIn={isLoggedIn} handleLogin={(e) => handleLogin(e)}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/info" element={<Plants setPlant={setPlant} isLoggedIn={isLoggedIn}/>} />
          <Route path="/info/:plant" element={<Plant plant={plant} isLoggedIn={isLoggedIn} setPlant={setPlant}/>}/>
          <Route path="/plants" element={<Plants setPlant={setPlant} isLoggedIn={isLoggedIn}/>}/>
          <Route path="/garden" element={isLoggedIn ? (
            <Garden plants={{plants: gardenPlants, setPlants: (p) => setGardenPlants(p), fetchGardenData: () => fetchGardenData()}} setPlant={setPlant} />
            ) : (
            <Home />
          )} />  
          <Route path="/register" element={isLoggedIn ? (
            <Navigate replace to="/" />
            ) : (
            <Login handleLogin={(e) => handleLogin(e)} />
          )} />
          <Route path="/login" element={isLoggedIn ? (
            <Navigate replace to="/" /> 
            ) : (
            <Login handleLogin={(e) => handleLogin(e)} />
          )} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
