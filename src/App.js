import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'

// Guidance from Udacity's React Fundamentals Course was instrumental in the development 
// of this application: https://in.udacity.com/course/react-nanodegree--nd019

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
	changeShelf= (book, shelf) => {
		BooksAPI.update(book, shelf)
		.then(()=> {
       		BooksAPI.getAll().then((allBooks) => {
				this.setState({ allBooks })
			})
		})
	}
	
	render() {
    	const { allBooks } = this.state
		return (
			<div>
				<Route exact path='/' render={() => (
					<Bookshelf 
						books={allBooks}
						changeShelf={this.changeShelf}
					/>
				)}/>
				<Route path='/search' render={() => (
					<Search 
    					books={allBooks}
						changeShelf={this.changeShelf}	
					/>
				)}/>
			</div>
		)
	}
}

export default App