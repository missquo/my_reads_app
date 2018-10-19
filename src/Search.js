import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

// Maeva's StudyJam was instrumental in helping with this search page: www.youtube.com/watch?v=i6L2jLHV9j8

class Search extends React.Component {
	state = {
		query: "",
		searchResults: []
	}

	// Updates state of query
	updateQuery = (query) => {
		this.setState({ query })
		this.updateBooks(query)
	}

	// Updates state of search results
	updateBooks = query => {
      	if(query) {
			BooksAPI.search(query).then((searchResults) => {
              if (query === this.state.query) {
				if (searchResults.error) {
					this.setState({ searchResults: [] });
				} else {
					this.setState({ searchResults });
				}
			}})
		} else {
			this.setState({ searchResults: [] });
		}

	}

	render() {
        const { books, changeShelf } = this.props
    	const { query, searchResults } = this.state
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className='close-search' to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search for a book by subject" 
							value={query} 
							// Updates search results while user types
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
              		</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{searchResults.map(searchedBook => {
                         	// Checks to see if book is on a shelf and changes shelf menu status appropriately
							let thisShelf = 'none';
                         	books.filter(shelvedBook => (shelvedBook.id === searchedBook.id ? thisShelf = shelvedBook.shelf : ''));
							return (
								<li key={searchedBook.id}>
									<Book book={searchedBook} changeShelf={changeShelf} currentShelf={thisShelf} />
								</li>
							);
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search