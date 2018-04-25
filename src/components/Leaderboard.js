import React from 'react'
import { connect } from 'react-redux'

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leaderboard: ''
        }
    }

    handleLeaderboardChange = (event) => {
        this.setState({ leaderboard: event.target.value })
    }

    render() {
        let number = 0
        const getNumber = () => {
            number++
            return number
        }

        return (
            <div className='leaderboard' style={{ height: window.innerHeight * 78, overflow: 'auto' }}>
                <h2 className='leaderboardHeader'>LEADERBOARD</h2>

                <div className='custom-select' style={{ width: '100%' }}>
                    <select name='leaderboard' onChange={this.handleLeaderboardChange}>
                        <option value=''>GLOBAL</option>
                        {this.props.courses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
                    </select>
                </div>
                <br></br>
                <div className='leaderboardTable'>
                    <table>
                        <tbody>
                            <tr className='leaderboardTopRow'>
                                <td>Ranking</td><td>Username</td><td>Points</td>
                            </tr>
                            {this.state.leaderboard === '' ? this.props.users.map(user =>
                            this.props.loggedUser.id === user.id ?
                                <tr className='loggedUserInLeaderboard' key={user.id}>
                                    <td>{getNumber()}.</td><td>{user.username}</td><td>{user.points}</td>
                                </tr>
                                :
                                <tr key={user.id}>
                                    <td>{getNumber()}.</td><td>{user.username}</td><td>{user.points}</td>
                                </tr>                            
                            )
                                :
                                this.props.courses.filter(course => course.id === this.state.leaderboard)
                                    .map(course => course.users
                                        .sort((a, b) => { return b.points > a.points })
                                        .map(courseUser =>
                                            this.props.loggedUser.id === courseUser.id ?
                                            <tr className='loggedUserInLeaderboard' key={courseUser.id}>
                                                <td>{getNumber()}.</td><td>{courseUser.username}</td><td>{courseUser.points}</td>
                                            </tr>
                                            :
                                            <tr key={courseUser.id}>
                                                <td>{getNumber()}.</td><td>{courseUser.username}</td><td>{courseUser.points}</td>
                                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        courses: state.courses,
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps, null)(Leaderboard)