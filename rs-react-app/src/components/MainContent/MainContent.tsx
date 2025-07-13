import { Component } from 'react';
// import ResultsTable from '../ResultsTable/ResultsTable';

interface MainContentProps {
  searchTerm: string;
  results: { name: string; description: string }[];
  isLoading: boolean;
  error: string | null;
}

class MainContent extends Component<MainContentProps> {
  render() {
    const { results, isLoading, error } = this.props;

    return (
      <main className="main-content">
        <h2 className="main-header">Results</h2>
        <div className="results-section">
          {isLoading && (
            <div className="loader">
              <div className="spinner"></div>
              <p>Search...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
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

          {/* {!isLoading && !error && (
            <ResultsTable results={results} searchTerm={searchTerm} />
          )} */}
        </div>
      </main>
    );
  }
}

export default MainContent;
