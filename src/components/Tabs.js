import React from 'react'

const Tabs = ( {handleShowAll} ) => {
    return (
        <button className='navButton' onClick={handleShowAll}>Show all</button>
    )
}

export default Tabs