import './App.css';
import React, { useState, useEffect } from 'react'
import Form from './components/Form';
import BookList from './components/BookList';
//import SeeAuthors from './components/SeeAuthors';
import AddAuthor from './components/AddAuthor';
import Modalx from './components/Modalx';

function App() {
	const [modal1Status, setmodal1] = useState(false)
	const [authorList, setAuthors] = useState([])
	const [showStatus, setStatus] = useState(0)
	const [bookList, setBookList] = useState([])
	const [currentAuthor, setCurrentAuthor] = useState(null)
	const [currentStatus, setcurrentStatus] = useState(0)
	const [atrModal, setAtrModal] = useState(0)
	const [bookFormModal, setBookmodal] = useState(0)
	console.log(currentStatus)
	useEffect(() => {
		setcurrentStatus(0)
	}, [])

	return (
		<div className="App">

			<div id="forms">
				<button className="btn btn-primary" onClick={() => { setAtrModal(1) }}>Add Author</button>
				<button className="btn btn-primary" onClick={() => { setBookmodal(1) }}>AddBook</button>
				<AddAuthor setcurrentStatus={setcurrentStatus} atrModal={atrModal} setAtrModal={setAtrModal} setAuthors={setAuthors} authorList={authorList} />
				<Form bookFormModal={bookFormModal} setBookmodal={setBookmodal} setcurrentStatus={setcurrentStatus} className="frm" setAuthors={setAuthors} authorList={authorList} bookList={bookList} setBookList={setBookList} />

			</div>
			<br />
			<div id="booksPart">
				<BookList setmodal1={setmodal1} setCurrentAuthor={setCurrentAuthor} setStatus={setStatus} bookList={bookList} setBookList={setBookList} />
				{/* 	{currentAuthor !== null && < SeeAuthors className="author" showStatus={showStatus} setStatus={setStatus} currentAuthor={currentAuthor} />}
			*/}
				{currentAuthor !== null && <Modalx setmodal1={setmodal1} modal1Status={modal1Status} showStatus={showStatus} setStatus={setStatus} currentAuthor={currentAuthor} />}
			</div>

		</div>
	)
}



export default App;
