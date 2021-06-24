import React, { useEffect, useState } from 'react'
import BookTd from './BookTd'
import './css/booklist.css'
function BookList({ bookList, setmodal1, setBookList, setStatus }) {

    const [status, setst] = useState(0)
    /**/

    useEffect(() => {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query{
                        books{
                            name
                            genre
                            id
                        }
                    }`
            }),
        }).then(res => res.json()).then(data => {
            setst(1)
            setBookList(data.data.books)
            console.log(bookList)
        })
    }, [])
    return (

        < div className="bklst">
            <h3 id="tblhdr">Book list</h3>
            <table className="tbl" border="2px">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>genre</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList.map((bk, index) => {
                        return <BookTd setmodal1={setmodal1} key={"book" + index} setStatus={setStatus} book={bk} />
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default BookList
