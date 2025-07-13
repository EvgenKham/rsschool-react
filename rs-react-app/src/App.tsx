import { Component } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <MainContent />
      </div>
    );
  }
}

export default App;
