import { Component } from 'react';

interface SearchResult {
  id: number;
  name: string;
  description: string;
}

interface ResultsTableProps {
  results: SearchResult[];
  searchTerm: string;
}

class ResultsTable extends Component<ResultsTableProps> {
  render() {
    const { results, searchTerm } = this.props;

    if (results.length === 0) {
      return (
        <div className="no-results">
          {searchTerm
            ? `On request "${searchTerm}" nothing found`
            : 'Enter a search term.'}
        </div>
      );
    }

    return (
      <table className="results-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ResultsTable;
