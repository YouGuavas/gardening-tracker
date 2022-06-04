import './styles/App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

import { fetchGardenData, getPlantsByType, getPlantByName, checkAuth } from './utils/api';

import {Nav} from './components/Nav';
import {Plants, Plant} from './components/Plants';
import {Home} from './components/Home';
import {Garden} from './components/Garden';
import {Login} from './components/Login';

function App() {

  const [plant, setPlant] = useState();
  const [plants, setPlants] = useState([]);
  const [gardenPlants, setGardenPlants] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userName, setUserName] = useState();
  
  const fetchPlantByName = async (typeOfPlant, nameOfPlant) => {
    const localPlant = await getPlantByName(typeOfPlant, nameOfPlant);
    setPlant(localPlant);
  }

  const setPlantList = async () => {
    const plantList = await getPlantsByType("peppers");
    setPlants(plantList);
  }
  const fetchNewGarden = async () => {
    setGardenPlants(await fetchGardenData())
  }


  useEffect( () => {
    const setMyPlants = async () => {
      setGardenPlants(await fetchGardenData());
    }
    const setMyAuthedStatus = async () => {
      const authed = await checkAuth();
      if (authed) {
        setIsLoggedIn(authed.truth);
      }
    }
    if (localStorage['gardeningTrackerLogin']) {
      const loginInfo = localStorage['gardeningTrackerLogin'];
      setMyAuthedStatus();
      setUserName(loginInfo.userName);
      setMyPlants();
  } else {
    setIsLoggedIn(false);
  }
  }, [isLoggedIn])

  
  return (
    <div className="App">
      <Nav links={['home', 'info']} classes="my-nav" isLoggedIn={isLoggedIn}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          
          <Route path="/home" element={<Home />}/>
          
          <Route path="/info" element={<Plants fetchGardenData={fetchNewGarden} setGardenPlants={setGardenPlants} userName={userName} plants={plants} gardenPlants={gardenPlants} setPlantList={setPlantList} setPlant={setPlant} isLoggedIn={isLoggedIn}/>} />
          
          <Route path="/info/:plant" element={<Plant fetchGardenData={fetchNewGarden} setGardenPlants={setGardenPlants} userName={userName} gardenPlants={gardenPlants} setPlant={fetchPlantByName} plant={plant} isLoggedIn={isLoggedIn}/>}/>
          
          <Route path="/plants" element={<Plants fetchGardenData={fetchNewGarden} setGardenPlants={setGardenPlants} userName={userName} plants={plants} gardenPlants={gardenPlants} setPlantList={setPlantList} setPlant={setPlant} isLoggedIn={isLoggedIn}/>}/>
          
         
          <Route path="/garden" element={isLoggedIn ? (
            <Garden userName={userName} plants={gardenPlants} />
            ) : (
            <Home />
          )} />  

          <Route path="/register" element={isLoggedIn ? (
            <Navigate replace to="/" />
            ) : (
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>
          )} />

          <Route path="/login" element={isLoggedIn ? (
            <Navigate replace to="/" /> 
            ) : (
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>
          )} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
