import React from 'react'
import NewQuest from './NewQuest'

const Userpage = ({ createNewQuest, handleDelete, state }) => {

    return (
        <div>
            <h2>Hello Henrik!</h2>
            <p><button onClick={handleDelete}>delete account</button></p>
            {state.user.admin ? <NewQuest createNewQuest={createNewQuest} /> : null}
            
        </div>
    )
}

export default Userpage