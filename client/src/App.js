import './App.css';
import React, { useState, useEffect } from 'react'
import Form from './components/Form';
import BookList from './components/BookList';
//import SeeAuthors from './components/SeeAuthors';
import AddAuthor from './components/AddAuthor';
import Modalx from './components/Modalx';
import { authorService } from './services/setCurrentAuthorService';

function App() {
	const [modal1Status, setmodal1] = useState(false)
	const [authorList, setAuthors] = useState([])
	const [showStatus, setStatus] = useState(0)
	const [bookList, setBookList] = useState([])
	const [currentAuthor, setCurrentAuthor] = useState(null)
	const [atrModal, setAtrModal] = useState(false)
	const [bookFormModal, setBookmodal] = useState(false)

	useEffect(() => {
		authorService.getAuthor().subscribe(x => {
			setCurrentAuthor(x)
		})
	}, [currentAuthor])

	return (
		<div className="App">

			<div id="forms">
				<button className="btn btn-primary" onClick={() => { setAtrModal(true) }}>Add Author</button>
				<button className="btn btn-primary" onClick={() => { setBookmodal(true) }}>AddBook</button>
				<AddAuthor atrModal={atrModal} setAtrModal={setAtrModal} setAuthors={setAuthors} authorList={authorList} />
				<Form bookFormModal={bookFormModal} setBookmodal={setBookmodal} className="frm" setAuthors={setAuthors} authorList={authorList} bookList={bookList} setBookList={setBookList} />

			</div>
			<br />
			<div id="booksPart">
				<BookList setmodal1={setmodal1} setStatus={setStatus} bookList={bookList} setBookList={setBookList} />

				{currentAuthor !== null && <Modalx setmodal1={setmodal1} modal1Status={modal1Status} showStatus={showStatus} setStatus={setStatus} currentAuthor={currentAuthor} />}
			</div>

		</div>
	)
}



export default App;
