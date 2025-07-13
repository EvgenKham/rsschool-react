import { Component } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import './style.css';

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
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      isLoading: false,
      error: null,
    };
  }

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

      localStorage.setItem('searchTerm', searchTerm);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      this.setState({
        error: 'Error fetching data',
        isLoading: false,
        results: [],
      });
    }
  };

  handleSearchSubmit = (searchTerm: string) => {
    this.setState({ searchTerm }, () => {
      this.fetchPokemon(searchTerm);
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
