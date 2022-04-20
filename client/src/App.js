import './styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react';

import {Nav} from './components/Nav';
import {Plants, Plant} from './components/Plants';
import {Home} from './components/Home';

function App() {
  const plants = [{name: 'Jalapeno', description: 'Lil green boi'}, {name: 'Habanero', description: 'Lil hot boi'}];
  const [plant, setPlant] = useState(plants[0]);
  return (
    <div className="App">
      <Nav links={['Home', 'Info', 'Garden']} classes="my-nav"/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Info" element={<Plants plants={plants} setPlant={setPlant}/>} />
          <Route path={`/plant/:plant`} element={<Plant plant={plant} setPlant={setPlant}/>}/>
          <Route path={`/plants`} element={<Plants plants={plants} setPlant={setPlant}/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
