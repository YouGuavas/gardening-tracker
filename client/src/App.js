import './styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react';

import {Nav} from './components/Nav';
import {Plants, Plant} from './components/Plants';
import {Home} from './components/Home';

function App() {
  const plants = [
    {name: 'Jalapeno', kind: 'Pepper', description: 'Lil green boi'}, 
    {name: 'Habanero', kind: 'Pepper', description: 'Lil hot boi'}
  ];
  const [plant, setPlant] = useState(plants[0]);
  return (
    <div className="App">
      <Nav links={['Home', 'Info', 'Garden']} classes="my-nav"/>
      Jeff
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/info" element={<Plants plants={plants} setPlant={setPlant}/>} />
          <Route path={`/info/:plant`} element={<Plant plant={plant} setPlant={setPlant}/>}/>
          <Route path={`/plants`} element={<Plants plants={plants} setPlant={setPlant}/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
