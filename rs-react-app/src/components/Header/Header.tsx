import { Component } from 'react';

interface SearchFormProps {
  onSearch?: (query: string) => void;
  initialQuery?: string;
}

interface SearchFormState {
  searchQuery: string;
}

class Header extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      searchQuery: props.initialQuery || '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchQuery: e.target.value });
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.props.onSearch) {
      this.props.onSearch(this.state.searchQuery);
    }
    console.log('Search query:', this.state.searchQuery);
    // Здесь можно добавить логику поиска (например, вызов API)
  }

  render() {
    return (
      <header className="app-header">
        <h1 className="logo">Pokemon Search</h1>
        <div className="search-container">
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="search-input"
              name="search"
              placeholder="Search..."
              aria-label="Search"
              value={this.state.searchQuery}
              onChange={this.handleInputChange}
            />
            <button type="submit" className="search-button">
              <span>Submit</span>
            </button>
          </form>
        </div>
      </header>
    );
  }
}

export default Header;
