import './styles/App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

import { getGardenPlants, getPlantsByType, getPlantByName } from './utils/api';

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

  const handleLogin = (status, user) => {
    setIsLoggedIn(status);
    setUserName(user);
    localStorage.setItem('gardeningTrackerLogin', JSON.stringify({'loggedIn': status, 'userName': user}));
  }
  const fetchGardenData = async (user) => {
    const localPlants = await getGardenPlants(user);
    setGardenPlants(localPlants);
  }
  const fetchPlantByName = async (typeOfPlant, nameOfPlant) => {
    const localPlant = await getPlantByName(typeOfPlant, nameOfPlant);
    setPlant(localPlant);
  }

  const setPlantList = async () => {
    const plantList = await getPlantsByType("peppers");
    setPlants(plantList);
  }


  useEffect(() => {
    if (localStorage['gardeningTrackerLogin']) {
      const loginInfo = JSON.parse(localStorage['gardeningTrackerLogin'])
      setIsLoggedIn(loginInfo.loggedIn);
      setUserName(loginInfo.userName);
      fetchGardenData(loginInfo.userName);
  }
  }, [isLoggedIn])

  
  return (
    <div className="App">
      <Nav links={['home', 'info']} classes="my-nav" isLoggedIn={isLoggedIn} handleLogin={(e) => handleLogin(e)}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/info" element={<Plants fetchGardenData={fetchGardenData} userName={userName} plants={plants} gardenPlants={gardenPlants} setPlantList={setPlantList} setPlant={setPlant} isLoggedIn={isLoggedIn}/>} />
          <Route path="/info/:plant" element={<Plant fetchGardenData={fetchGardenData} userName={userName} gardenPlants={gardenPlants} setPlant={fetchPlantByName} plant={plant} isLoggedIn={isLoggedIn}/>}/>
          <Route path="/plants" element={<Plants fetchGardenData={fetchGardenData} userName={userName} plants={plants} gardenPlants={gardenPlants} setPlantList={setPlantList} setPlant={setPlant} isLoggedIn={isLoggedIn}/>}/>
          
          <Route path="/garden" element={isLoggedIn ? (
            <Garden userName={userName} plants={gardenPlants} />
            ) : (
            <Home />
          )} />  

          <Route path="/register" element={isLoggedIn ? (
            <Navigate replace to="/" />
            ) : (
            <Login handleLogin={handleLogin} />
          )} />

          <Route path="/login" element={isLoggedIn ? (
            <Navigate replace to="/" /> 
            ) : (
            <Login handleLogin={handleLogin} />
          )} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
