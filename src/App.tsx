import logo from './logo.svg';
import './App.css';
import { Grid } from '@material-ui/core';
import { Players } from './app/pages/players';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width={50} />
        {/* <Counter /> */}
      </header>
      <Players />
    </div>
  );
}

export default App;
