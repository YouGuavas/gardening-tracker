import './styles/App.scss';
import {Nav} from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav links={['Buttons', 'Navs', 'Forms']} classes="my-nav"/>
    </div>
  );
}

export default App;
