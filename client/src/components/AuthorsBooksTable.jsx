import React from 'react'
import './css/authorsbookstbl.css'
function AuthorsBooksTable({ buklst, currentAuthor }) {
    return (
        <div >
            <h5 id="authrhdr">{currentAuthor.name}'s books</h5>
            <table border="2px" id="bklstar">

                <thead>
                    <tr><th>name</th>
                        <th>genre</th>
                    </tr>

                </thead>
                <tbody>
                    {buklst.map((bk, index) => {
                        return (
                            <tr key={"authorbooknm" + index}>
                                <td id={"authorbooknm" + index}>{bk.name}</td>
                                <td id={"authorbookgn" + index}>{bk.genre}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AuthorsBooksTable
