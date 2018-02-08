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
                                {/* Does nothing, no functionality in the buttons/tabs to be figured out */}
                                <button className='navButton' onClick={handleShowAll}>Show all</button>
                            </td>
                            <td>
                                <button className='navButton'>Leaderboard</button>
                            </td>
                            <td>
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
