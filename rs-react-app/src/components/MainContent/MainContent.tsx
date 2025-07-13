import { Component } from 'react';
import ResultsTable from '../ResultsTable/ResultsTable';

interface MainContentProps {
  searchTerm: string;
  results: Array<{ id: number; name: string; description: string }>;
  isLoading: boolean;
  error: string | null;
}

class MainContent extends Component<MainContentProps> {
  render() {
    const { searchTerm, results, isLoading, error } = this.props;

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
            <ResultsTable results={results} searchTerm={searchTerm} />
          )}
        </div>
      </main>
    );
  }
}

export default MainContent;
