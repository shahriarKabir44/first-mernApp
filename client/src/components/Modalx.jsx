import React, { useState, useEffect } from 'react'
import AuthorsBooksTable from './AuthorsBooksTable'
import { Modal } from 'react-bootstrap'
function Modalx({ modal1Status, currentAuthor, showStatus, setStatus, setmodal1 }) {
    const [buklst, setbuklst] = useState([])
    const [status, setst] = useState(0)
    const getbook = () => {
        setStatus(1)
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query{
                    author(id: "${currentAuthor.id}"){
                        books{
                            name 
                            genre
                        }
                    }
                  
                }`
            }),
        }).then(res => res.json()).then(data => {
            setbuklst(data.data.author.books)
            setst(1)
        })
    }

    useEffect(() => {

    }, [status])
    return (
        <div>
            <Modal show={modal1Status} onHide={() => { setmodal1(0) }}>
                <Modal.Header>Author details</Modal.Header>
                <Modal.Body><ul id="atrdtul">
                    <li>name:{currentAuthor.name}</li>
                    <li>age:{currentAuthor.age}</li>
                    <li><button onClick={getbook}>show books</button></li>
                </ul></Modal.Body>
                <Modal.Footer>{showStatus === 1 && <AuthorsBooksTable buklst={buklst} currentAuthor={currentAuthor} />}</Modal.Footer>
            </Modal>
        </div>
    )
}

export default Modalx
