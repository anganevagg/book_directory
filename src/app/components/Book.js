import React, { Component, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"

export function Book(props) {
	const [book, setBook] = useState({})
	const [open, setOpen] = useState(false)
	const [loadingBook, setLoadingBook] = useState(true)
	function openModal(e) {
		setLoadingBook(true)
		setOpen(true)
		fetch(`/api/books/${e.target.id}`)
			.then(res => res.json())
			.then(data => {
				setBook(data)
				setLoadingBook(false)
				console.log(data.ratings)
			})
	}

	function closeModal(e) {
		setOpen(false)
	}
	return (
		<div className="d-flex justify-content-center">
			<div className="card pb-3 pt-3 col-7">
				<div className="row text-start">
					<div className="col-md-4 col-sm-5 mx-auto">
						<img src={props.img} alt="" className="img-fluid rounded d-block m-l-none" />
					</div>
					<div className="col-8">
						<div className="col-12"></div>
						<h5 className="">{props.title}</h5>
						<p className="">{props.author} ({props.year})</p>
						<p>Publisher: {props.publisher}</p>
						<p>ISBN: {props.isbn}</p>
						<div>
							<div className="col-12 mb-4">
								<div className="col-6 mx-auto">
									<button href="" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={openModal} id={props._id}>View Info</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal size="lg" show={open}>
				<Modal.Body>{
					loadingBook ?
						(<p>Loading...</p>) : (
							<div>
								<div className="card pb-3 pt-3">
									<div className="row text-start">
										<div className="col-md-3 col-sm-5 mx-auto">
											<img src={book["Image-URL-L"]} alt="" className="img-fluid rounded d-block m-l-none" />
										</div>
										<div className="col-8">
											<div className="col-12"></div>
											<h5 className="">{book["Book-Title"]}</h5>
											<p className="">{book["Book-Author"]} ({book["Year-Of-Publication"]})</p>
											<p>Publisher: {book.Publisher}</p>
											<p>ISBN: {book.ISBN}</p>
											<div className="row d-flex justify-content-center mt-5">
												<div className="col-4 mx-3"><button className="btn btn-primary col-12">update</button></div>
												<div className="col-4 mx-3"><button className="btn btn-danger col-12">delete</button></div>

											</div>
										</div>
									</div>
								</div>
								<div className="row d-flex justify-content-center">
									<p className="display-5">Book Ratings</p>
									{
										book.ratings.map((rating) => {
											return (
												<div className="card col-3 mx-3 my-3" key={rating._id}>
													<p>User: {rating.user[0]["User-ID"]}</p>
													<p>Age: {rating.user[0].Age}</p>
													<p>Location: {rating.user[0].Location}</p>
													<p>Rating: {rating["Book-Rating"]}</p>
												</div>
											)
										})
									}
								</div>
							</div>
						)
				}
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-secondary" onClick={closeModal}>Close</button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}