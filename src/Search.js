import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

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
				if (searchResults.error) {
					this.setState({ searchResults: [] });
				} else {
					this.setState({ searchResults });
				}
			})
		} else {
			this.setState({ searchResults: [] });
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className='close-search' to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search for a book by subject" 
							value={this.state.query} 
							// Updates search results while user types
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
              		</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.searchResults.map(searchedBook => {
                         	// Checks to see if book is on a shelf and changes shelf menu status appropriately
							let shelf = "none";
							this.props.books.map(book => (
								book.id === searchedBook.id ?
								shelf = book.shelf : 
                      			''
                         	));
							return (
								<li key={searchedBook.id}>
									<Book book={searchedBook} changeShelf={this.props.changeShelf} currentShelf={shelf} />
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