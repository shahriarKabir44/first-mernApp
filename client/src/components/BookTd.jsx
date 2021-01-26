
import React, { useEffect } from 'react'

function BookTd({ setmodal1, name, ID, genre, setCurrentAuthor, setStatus }) {
    const show = () => {
        setCurrentAuthor(null)
        setmodal1(false)
        setStatus(0)
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query {
                    book(id: "${ID}"){
                        author{
                            name
                            age
                            id
                        }
                    }
                }`
            }),
        }).then(res => res.json()).then(data => {
            setCurrentAuthor(data.data.book.author)
            setmodal1(true)
        })
    }
    useEffect(() => {

    }, [])

    return (
        <tr>
            <td>{name}</td>
            <td>{genre}</td>
            <td> <button onClick={show}>seeauthor</button> </td>
        </tr>
    )
}

export default BookTd
