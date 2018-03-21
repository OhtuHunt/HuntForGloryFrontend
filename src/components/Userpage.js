import React from 'react'
import NewQuest from './NewQuest'
import EditUserInformation from './EditUserInformation'

const Userpage = ({ user, createNewQuest, handleDelete, state, handleLogout, editUser, store }) => {
    return (
        <div style={{height: '100%'}}>
        {user !== undefined ? 
        <div>
            <h2>Hello {user.username}!</h2>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={handleLogout}>Logout</button>
            <br></br>
            <br></br>
            <br></br>
            {state.user.admin ? <NewQuest createNewQuest={createNewQuest} store={store}/> : null}
            <br></br>
            <br></br>
            <br></br>
            <EditUserInformation user={user} edit={editUser}/>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={handleDelete}>delete account</button>
            </div>
            :
            <div>
            </div>
        }
        </div>
    )
}

export default Userpage