import './styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import {Nav} from './components/Nav';
import {Plant} from './components/Plant';
import {Home} from './components/Home';

function App() {
  return (
    <div className="App">
      <Nav links={['Buttons', 'Navs', 'Forms']} classes="my-nav"/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/plant" element={<Plant />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
