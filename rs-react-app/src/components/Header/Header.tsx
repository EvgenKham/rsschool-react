import { Component } from 'react';

interface HeaderProps {
  onSearchSubmit: (searchTerm: string) => void;
}

interface HeaderState {
  inputValue: string;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim()) {
      this.props.onSearchSubmit(inputValue.trim());
    }
  };

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
              value={this.state.inputValue}
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
