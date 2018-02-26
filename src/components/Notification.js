import React from 'react'

const Notification = ({ message }) => {
    if (message !== null) {
        return (
            <div>
                <p>{message}</p>
            </div>
        )
    }
    return null
}

export default Notification