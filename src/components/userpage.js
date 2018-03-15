import React from 'react'
import NewQuest from './NewQuest'
import EditUserInformation from './EditUserInformation'

const Userpage = ({ user, createNewQuest, handleDelete, state, handleLogout, editUser }) => {
    return (
        <div style={{height: '100%'}}>
            <h2>Hello {user.username}!</h2>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={handleLogout}>Logout</button>
            <br></br>
            <br></br>
            <br></br>
            {state.user.admin ? <NewQuest createNewQuest={createNewQuest} /> : null}
            <br></br>
            <br></br>
            <br></br>
            <EditUserInformation user={user} edit={editUser}/>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={handleDelete}>delete account</button>
            
        </div>
    )
}

export default Userpage