import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book'
import sortBy from 'sort-by'

function Bookshelf (props) {
  	const { books, changeShelf } = props
	return (
		<div className="app">
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<div className="bookshelf">
							<h2 className="bookshelf-title">Currently Reading</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{/* Loops through all books on Currently Reading shelf */}
									{books.filter(book => book.shelf === 'currentlyReading').sort(sortBy('title'))
									.map(book => (
										<li key={book.id}>
											<Book book={book} changeShelf={changeShelf} currentShelf='currentlyReading' />
										</li>
									))}
								</ol>
							</div>
						</div>
						<div className="bookshelf">
							<h2 className="bookshelf-title">Want to Read</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{/* Loops through all books on Want To Read shelf */}
									{books.filter(book => book.shelf === 'wantToRead').sort(sortBy('title'))
									.map(book => (
	 									<li key={book.id}>
											<Book book={book} changeShelf={changeShelf} currentShelf='wantToRead' />
										</li>
									))}
								</ol>
							</div>
						</div>
						<div className="bookshelf">
							<h2 className="bookshelf-title">Read</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{/* Loops through all books on Read shelf */}
									{props.books.filter(book => book.shelf === 'read').sort(sortBy('title'))
									.map(book => (
										<li key={book.id}>
											<Book book={book} changeShelf={props.changeShelf} currentShelf='read' />
										</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="open-search">
					<Link to='/search' className='open-search'>Add a book</Link>
				</div>
			</div>
		</div>
	)
}

export default Bookshelf