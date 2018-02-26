import React from 'react'
import NewQuest from './NewQuest'

const Userpage = ({ createNewQuest}) => {
    return (
        <div>
            <h2>Hello Henrik!</h2>
            <p>This is your personal page for settings etc. upcoming on spring 4</p>

            <NewQuest createNewQuest={createNewQuest} />
        </div>
    )
}

export default Userpage