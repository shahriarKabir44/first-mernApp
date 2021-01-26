import React, { useState, useEffect } from 'react'
import AuthorsBooksTable from './AuthorsBooksTable'
import './css/seeauthor.css'
function SeeAuthors({ currentAuthor, showStatus, setStatus }) {
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
    if (currentAuthor == null) {
        return (
            <h2 className="authrhdr author">
                select one
            </h2>
        )
    }
    else {
        return (
            <div className="author">
                <h3 className="authrhdr">Author details</h3>
                <ul id="atrdtul">
                    <li>name:{currentAuthor.name}</li>
                    <li>age:{currentAuthor.age}</li>
                    <li><button onClick={getbook}>show books</button></li>
                </ul>


                {showStatus === 1 && <AuthorsBooksTable buklst={buklst} currentAuthor={currentAuthor} />}
            </div>
        )
    }
}

export default SeeAuthors
