import React from 'react'

const headerTable = {
    width: window.innerWidth,
}

const Header = ({ handleShowAll }) => {
    return (
        <div>
            <h1 className='header__title'>Hunt for Glory</h1>
            <div className='navBar'>
                <table style={headerTable}>
                    <tbody>
                        <tr>
                            <td>
                                <button className='navButton' onClick={handleShowAll()}>Show all</button>
                            </td>
                            <td>
                                {/* Does nothing, to be implemented when we have points to create a leaderboard */}
                                <button className='navButton'>Leaderboard</button>
                            </td>
                            <td>
                                {/* Does nothing, to be implemented when we have an user with settings */}
                                <button className='navButton'>User settings</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Header
