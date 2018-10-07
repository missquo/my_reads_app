import React from 'react'
import './App.css'

function Book (props) {
	// Provides line breaks for books with multiple authors
	let formatAuthors = (authors) => 
		authors.map((author) => (
			<div key={props.book.title + author}>{author}
			</div>
		)
	)     
               
	let bookCover = props.book.imageLinks ? props.book.imageLinks.smallThumbnail : "";
	let authorCheck = props.book.authors ? props.book.authors : [];
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193,
					backgroundImage: `url(${bookCover})`}}>
				</div>
				<div className="book-shelf-changer">
					<select onChange={(event) => props.changeShelf(props.book, event.target.value)}
						value={props.currentShelf}>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{props.book.title}
			</div>
			<div className="book-authors">{formatAuthors(authorCheck)}
			</div>		
		</div>
	)
}

export default Book