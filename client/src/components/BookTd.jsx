
import React, { useEffect } from 'react'
import { detailsModalService } from '../services/bookDetailsModalService'
import { authorService } from '../services/setCurrentAuthorService'

function BookTd({ setmodal1, book, setStatus }) {
    const show = () => {
        authorService.setAuthor(null)
        detailsModalService.toggle(false)
        setStatus(0)
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query {
                    book(id: "${book.id}"){
                        author{
                            name
                            age
                            id
                        }
                    }
                }`
            }),
        }).then(res => res.json()).then(data => {
            authorService.setAuthor(data.data.book.author)
            detailsModalService.toggle(true)
        })
    }
    useEffect(() => {

    }, [])

    return (
        <tr>
            <td>{book.name}</td>
            <td>{book.genre}</td>
            <td> <button className="btn btn-primary" onClick={show}>seeauthor</button> </td>
        </tr>
    )
}

export default BookTd
