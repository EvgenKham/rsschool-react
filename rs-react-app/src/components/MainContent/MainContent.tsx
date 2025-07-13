import { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface MainContentProps {
  searchTerm: string;
  results: { name: string; description: string }[];
  isLoading: boolean;
  error: string | null;
}

class MainContent extends Component<MainContentProps> {
  throwTestError = () => {
    throw new Error('Test error from Error button');
  };

  render() {
    const { results, isLoading, error } = this.props;

    return (
      <ErrorBoundary>
        <main className="main-content">
          <div className="main-header">
            <h2 className="main-header-name">Results</h2>
            <button className="error-test-button" onClick={this.throwTestError}>
              Error
            </button>
          </div>

          <div className="results-section">
            {isLoading && (
              <div className="loader">
                <div className="spinner"></div>
                <p>Search...</p>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span className="error-icon"></span>
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((pokemon, index) => (
                    <tr key={index}>
                      <td>{pokemon.name}</td>
                      <td>{pokemon.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </ErrorBoundary>
    );
  }
}

export default MainContent;
