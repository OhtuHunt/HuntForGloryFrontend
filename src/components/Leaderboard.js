import React from 'react'
import {connect} from 'react-redux'

class Leaderboard extends React.Component {

    render() {
        let number = 0
        const getNumber = () => {
            number++
            return number
        }
        return (
            <div className="leaderboard">
                <h2 className="leaderboardHeader">LEADERBOARD</h2>
                <br></br>
                <div className="leaderboardTable">
                    <table>
                        <tbody>
                            <tr className="leaderboardTopRow">
                                <td>Ranking</td><td>Username</td><td>Points</td>
                            </tr>
                            {this.props.users.map(user =>
                                <tr key={user.id}>
                                    <td>{getNumber()}.</td><td>{user.username}</td><td>{user.points}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, null)(Leaderboard)