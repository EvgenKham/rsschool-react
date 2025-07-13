import { Component } from 'react';

interface HeaderProps {
  onSearchSubmit: (searchTerm: string) => void;
  initialValue: string;
}

interface HeaderState {
  inputValue: string;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      inputValue: props.initialValue,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.inputValue);
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
