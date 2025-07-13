import { Component } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import './style.css';

const SEARCH_TERM_KEY = 'pokemonSearchTerm';

interface PokemonResult {
  name: string;
  url: string;
}

interface AppState {
  searchTerm: string;
  results: Array<{ name: string; description: string }>;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: this.getSavedSearchTerm(),
      results: [],
      isLoading: false,
      error: null,
    };
  }

  // Метод для получения сохраненного поискового запроса
  getSavedSearchTerm = (): string => {
    try {
      const savedTerm = localStorage.getItem(SEARCH_TERM_KEY);
      return savedTerm ? savedTerm : '';
    } catch (error) {
      console.error('Error reading from LocalStorage:', error);
      return '';
    }
  };

  // Метод для сохранения поискового запроса
  saveSearchTerm = (term: string): void => {
    try {
      localStorage.setItem(SEARCH_TERM_KEY, term);
    } catch (error) {
      console.error('Error saving to LocalStorage:', error);
    }
  };

  componentDidMount() {
    this.fetchPokemon(this.state.searchTerm);
  }

  fetchPokemon = async (searchTerm: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

      if (searchTerm.trim()) {
        apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`;
        const response = await axios.get(apiUrl);
        this.setState({
          results: [
            {
              name: response.data.name,
              description: `Height: ${response.data.height}, Weight: ${response.data.weight}`,
            },
          ],
          isLoading: false,
        });
      } else {
        const response = await axios.get(apiUrl);
        const pokemonList = response.data.results.map(
          (pokemon: PokemonResult) => ({
            name: pokemon.name,
            description: `Details at: ${pokemon.url}`,
          })
        );
        this.setState({ results: pokemonList, isLoading: false });
      }

      this.saveSearchTerm(searchTerm);
    } catch (error) {
      this.handleApiError(error);
    }
  };

  handleApiError = (error: unknown) => {
    let errorMessage = 'An unexpected error occurred';

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      switch (status) {
        case 400:
          errorMessage = 'Invalid request parameters. Error code 400';
          break;
        case 401:
          errorMessage = 'Authentication required. Error code 401';
          break;
        case 403:
          errorMessage = 'Access denied. Error code 403';
          break;
        case 404:
          errorMessage = 'Pokemon not found. Error code 404';
          break;
        case 429:
          errorMessage =
            'Too many requests, please try again later. Error code 429';
          break;
        case 500:
          errorMessage = 'Server error, please try again later. Error code 500';
          break;
        case 503:
          errorMessage =
            'Service unavailable, please try again later. Error code 503';
          break;
        default:
          if (error.code === 'ERR_NETWORK') {
            errorMessage = 'Network error, please check your connection';
          } else if (error.response) {
            errorMessage = `Request failed with status ${status}`;
          } else if (error.request) {
            errorMessage = 'No response received from server';
          }
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    this.setState({
      error: errorMessage,
      isLoading: false,
      results: [],
    });
  };

  handleSearchSubmit = (searchTerm: string) => {
    const processedTerm = searchTerm.trim();
    this.saveSearchTerm(processedTerm);
    this.setState({ searchTerm: processedTerm }, () => {
      this.fetchPokemon(processedTerm);
    });
  };

  render() {
    const { searchTerm, results, isLoading, error } = this.state;

    return (
      <div className="app-container">
        <Header
          onSearchSubmit={this.handleSearchSubmit}
          initialValue={searchTerm}
        />
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
