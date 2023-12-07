import logo from './logo.svg';
import './App.css';
import { Players } from './app/pages/players/index';
import ErrorBoundary from './app/components/ErrorBoundary';

function App() {
  return (
    <div className="App" data-testid="app">
      <header className="App-header" data-testid='header'>
        <img src={logo} className="App-logo" alt="logo" width={50} />
      </header>
      {/* <ErrorBoundary>
        <Players />
      </ErrorBoundary> */}
    </div>
  );
}

export default App;
