import React, { useState, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { Modal } from 'react-bootstrap'
import './css/addauthor.css'
function AddAuthor({ authorList, setAuthors, atrModal, setAtrModal }) {
    const socket = useRef()
    const [name, setname] = useState('')
    const [age, setage] = useState('')
    useEffect(() => {
        socket.current = socketIOClient('http://localhost:4000')
        socket.current.on('msg', data => {
            setAuthors([
                ...authorList, {
                    name: data.name,
                    age: data.age,
                    id: data.id
                }
            ])
        })
    }, [authorList])
    const authorForm = (e) => {
        e.preventDefault()
        /**/
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `mutation {
                            addAuthor(name:"${name}" age:${age * 1}){
                                name
                                age 
                                id
                            }
                        }`
            }),
        }).then(res => res.json()).then(data => {
            console.log(data.data.addAuthor)
            setAuthors([
                ...authorList, {
                    name: data.data.addAuthor.name,
                    age: data.data.addAuthor.age,
                    id: data.data.addAuthor.id
                }
            ])
            socket.current.emit('mss', {
                name: data.data.addAuthor.name,
                age: data.data.addAuthor.age,
                id: data.data.addAuthor.id
            })
        })
        setname('')
        setage('')
    }
    return (
        <Modal show={atrModal} onHide={() => { setAtrModal(false) }} >
            <Modal.Header><h3 id="addatrlbl">Add Author</h3></Modal.Header>
            <Modal.Body>

                <form onSubmit={authorForm} className="authorForm">

                    <input placeholder="name" type="text" value={name} onChange={(e) => { setname(e.target.value) }} />
                    <br />
                    <input placeholder="age" type="text" value={age} onChange={(e) => { setage(e.target.value) }} />
                    <button id="addatrbun" type="submit">add author</button>
                </form>
            </Modal.Body>

        </Modal>
    )
}

export default AddAuthor
