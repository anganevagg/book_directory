import React, { Component, useEffect, useState } from "react"

export function Filter(props) {
	const [bodyForm, setBodyForm] = useState({
		ISBN: "",
		author: "",
		year: "",
		publisher: "",
		title: props.title
	})
	function handleForm(e) {
		setBodyForm((prevState) => {
			let body = prevState
			body[e.target.name] = e.target.value
			return body
		})
		fetch("/api/books/filter", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyForm)
		})
			.then(res => res.json())
			.then(data => {
				props.setLoading(false)
				props.setBooks(data)
				props.groupYears(data)
				props.groupAuthors(data)
			})
	}
	return (
		<>
			<h2>Filter</h2>
			<form action="" className="col-12 ">
				<div className="container-fluid">
					<div className="d-flex justify-content-center">
						<div className="col-10">
							<div className="mb-4">
								<div className="col-12">
									<input type="text" name="ISBN" id="ISBN" className="form-control text-center col-9" placeholder="ISBN" onChange={handleForm.bind(this)} />
								</div>
							</div>
							<div className="mb-4">
								<div className="col-12">
									<input type="text" name="author" id="author" className="form-control text-center col-9" placeholder="Author" onChange={handleForm.bind(this)} />
								</div>
							</div>
							<div className="mb-4">
								<div className="col-12">
									<input type="text" name="year" id="year" className="form-control text-center col-9" placeholder="Year" onChange={handleForm.bind(this)} />
								</div>
							</div>
							<div className="mb-4">
								<div className="col-12">
									<input type="text" name="publisher" id="publisher" className="form-control text-center col-9" placeholder="Publisher" onChange={handleForm.bind(this)} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	)
}