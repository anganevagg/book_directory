import React, { Component, useEffect, useState } from "react"
import { Book } from "./components/Book"
import { Filter } from "./components/Filter"


export function App() {
	const [loading, setLoading] = useState(true)
	const [books, setBooks] = useState([])
	const [years, setYears] = useState([])
	const [authors, setAuthors] = useState([])
	const [bodyForm, setBodyForm] = useState({
		title: ""
	})
	
	function groupYears(data) {
		let years = [...new Set(data.map(book => book["Year-Of-Publication"]))].sort()
		setYears(years)
		return years
	}
	function groupAuthors(data) {
		let authors = [...new Set(data.map(book => book["Book-Author"]))].sort()
		setAuthors(authors)
		return authors
	}
	function handleForm(e) {
		setBodyForm((prevState) => {
			let body = prevState
			body[e.target.name] = e.target.value
			return body
		})
	}
	function handleSubmit(e) {
		setLoading(true)
		fetch("/api/books/search", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyForm)
		})
			.then(res => res.json())
			.then(data => {
				setLoading(false)
				setBooks(data)
				groupYears(data)
				groupAuthors(data)
			})
		e.preventDefault()
	}
	useEffect(() => {
		fetch('/api/books').then((res) => res.json())
			.then(data => {
				setLoading(false)
				setBooks(data)
				groupYears(data)
				groupAuthors(data)
			})
	}, [])
	return <>
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Book directory</a>
				<form className="d-flex" onSubmit={handleSubmit}>
					<input type="text" name="title" id="title" className="form-control me-2" placeholder="Book Title" onChange={handleForm.bind(this)} />
					<button className="btn btn-success" type="submit">Search</button>
				</form>
			</div>
		</nav>
		<div className="container d-flex justify-content-center">
			<div className="row text-center mx-auto">
				<div className="col-4 card pt-4 mt-4 mb-4">
					<div className="row">
						<Filter
							setLoading={setLoading}
							setBooks={setBooks}
							setYears={setYears}
							groupYears={groupYears}
							setAuthors={setAuthors}
							groupAuthors={groupAuthors}
							title={bodyForm.title}
						/>
						<div className="card col-4 mx-1">
							<h2>Years</h2>
							{
								loading?
									(
										<p>Loading...</p>
									)
								:years.map((year) => (
						<a key={year}>{year}</a>
						))
							}
					</div>
					<div className="card col-6 mx-1">
						<h2>Authors</h2>
						{
							loading ?
								(
									<p>Loading...</p>
								)
								:authors.map((author) => (
									<a key={author}>{author}</a>
								))
						}
					</div>
				</div>
			</div>
			<div className="col-8 card pt-4 mt-4 mb-4">
				<div className="">
					<div>
						<h2 className="col-8">Results</h2>
					</div>
					{
						loading ? (
							<p>Loading...</p>
						) : books.map((book) => (
							<Book
								key={book._id}
								_id={book._id}
								author={book["Book-Author"]}
								title={book["Book-Title"]}
								img={book["Image-URL-L"]}
								year={book["Year-Of-Publication"]}
								publisher={book["Publisher"]}
								isbn={book["ISBN"]}
							/>
						))
					}
				</div>
			</div>
		</div>
	</div>
	</>
}