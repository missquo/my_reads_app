import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'

class App extends React.Component {
	state = {
		allBooks: []
	}

	// Gets all book objects from database
	componentDidMount(){
		BooksAPI.getAll().then((allBooks) => {
			this.setState({ allBooks })
		})
	}

	// Updates a book's shelf location based on user input
	changeShelf= (book,shelf) => {
		BooksAPI.update(book,shelf)
		.then(()=> {
       		BooksAPI.getAll().then((allBooks) => {
				this.setState({ allBooks })
			})
		})
	}
	
	render() {
		return (
			<div>
				<Route exact path='/' render={() => (
					<Bookshelf 
						books={this.state.allBooks}
						changeShelf={this.changeShelf}
					/>
				)}/>
				<Route path='/search' render={() => (
					<Search 
    					books={this.state.allBooks}
						changeShelf={this.changeShelf}	
					/>
				)}/>
			</div>
		)
	}
}

export default App