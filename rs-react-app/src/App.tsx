import { Component } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import './style.css';

interface AppState {
  searchTerm: string;
  results: Array<{ id: number; name: string; description: string }>;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      isLoading: false,
      error: null,
    };
  }

  // Метод для обновления поискового запроса
  handleSearchSubmit = (searchTerm: string) => {
    this.setState({ searchTerm, isLoading: true });

    // Здесь будет вызов API для получения результатов
    setTimeout(() => {
      this.setState({
        isLoading: false,
        results: [
          {
            id: 1,
            name: `Result for "${searchTerm}"`,
            description: 'Description 1',
          },
          {
            id: 2,
            name: `Result for "${searchTerm}"`,
            description: 'Description 2',
          },
        ],
      });
    }, 1000);
  };

  render() {
    const { searchTerm, results, isLoading, error } = this.state;

    return (
      <div className="app-container">
        <Header onSearchSubmit={this.handleSearchSubmit} />
        <MainContent
          searchTerm={searchTerm}
          results={results}
          isLoading={isLoading}
          error={error}
        />
      </div>
    );
  }
}

export default App;
