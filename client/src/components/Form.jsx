import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { Modal } from 'react-bootstrap'
import './css/form.css'

function Form({ setBookList, setAuthors, authorList, bookList, bookFormModal, setBookmodal }) {
    const socket = socketIOClient('http://localhost:4000')

    const [authors, setatrs] = useState('')
    const [gnr, setgnr] = useState('')
    const [nm, setnm] = useState('')
    useEffect(() => {
        socket.on('newbook', data => {
            setBookList([
                ...bookList, {
                    name: data.name,
                    genre: data.genre,
                    id: data.id
                }
            ])
        })
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query{
                    authors{
                        name
                        age 
                        id
                    }
                }`
            }),
        }).then(res => res.json()).then(data => {
            setAuthors(data.data.authors)
        })
    }, [bookList])

    const submithnd = (e) => {
        e.preventDefault()
        setnm('')
        setgnr('')
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `mutation {
                    addBook(name:"${nm}" genre:"${gnr}" authorId:"${authors}"){
                            name
                            genre
                            id
                        }
                    }`
            }),
        }).then(res => res.json()).then(data => {
            console.log(data.data.addBook)
            setBookList([
                ...bookList, {
                    name: data.data.addBook.name,
                    genre: data.data.addBook.genre,
                    id: data.data.addBook.id
                }
            ])
            socket.emit('addbook', {
                name: data.data.addBook.name,
                genre: data.data.addBook.genre,
                id: data.data.addBook.id
            })
        })
    }
    return (
        <Modal show={bookFormModal} onHide={() => { setBookmodal(0) }}>
            <Modal.Header>
                <h3 id="bklbl">Create Book</h3>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={submithnd} id="insertBookForm">
                    <div>
                        <label htmlFor="erre">Book Name: </label>
                        <select name="authors" id="authorOptn" onChange={(e) => { setatrs(e.target.value) }}>
                            <option value={null} key={-1}>Select one</option>
                            {authorList.map((atr, index) => {
                                return <option value={atr.id} key={index}>{atr.name}</option>
                            })}
                        </select>
                    </div>

                    <input type="text" placeholder="name" className="inp" value={nm} onChange={(e) => { setnm(e.target.value) }} />
                    <input type="text" placeholder="genre" className="inp" value={gnr} onChange={(e) => { setgnr(e.target.value) }} />
                    <button id="addbookbtn" type="submit">Done!</button>
                </form>
            </Modal.Body>

        </Modal>
    )
}

export default Form
