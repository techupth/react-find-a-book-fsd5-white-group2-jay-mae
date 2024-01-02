import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      // Encode the search term to handle special characters
      const encodedSearchTerm = encodeURIComponent(searchTerm);

      // Google Books API endpoint
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedSearchTerm}`;

      // Make the API request
      axios.get(apiUrl)
        .then(response => {
          // Extract book items from the API response
          const books = response.data.items || [];

          // Update the search results state
          setSearchResults(books);
        })
        .catch(error => {
          console.error('Error fetching data from Google Books API:', error);
        });
    } else {
      // Clear search results if the search term is empty
      setSearchResults([]);
    }
  }, [searchTerm]);
  return <div className="App">
    <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       <ul>
        {searchResults.map(book => (
          <li key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            {book.volumeInfo.authors && (
              <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
            )}
            {book.volumeInfo.description && (
              <p>Description: {book.volumeInfo.description}</p>
            )}
            <hr />
          </li>
        ))}
      </ul>
  </div>;
}

export default App;
