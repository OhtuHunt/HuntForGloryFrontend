import React from 'react'
import NewQuest from './NewQuest'
import NewCourse from './NewCourse'
import EditUserInformation from './EditUserInformation'
import { removeUser } from '../reducers/usersReducer'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { connect } from 'react-redux'
import JoinCourse from './JoinCourse'

class Userpage extends React.Component {

    handleDeleteAccount = () => {
        if (window.confirm("Do you want to delete your account?")) {
            this.props.removeUser(this.props.loggedUser.id)
            this.handleLogout()
        }

    }

    handleLogout = () => {
        window.localStorage.removeItem("LoggedTmcUser")
        this.props.setLoggedUser(null)
    }

    render() {
        return (
            <div style={{ height: window.innerHeight * 0.78, overflow: 'auto' }}>
                {this.props.loggedUser !== undefined ?
                    <div>
                        <h2>Hello {this.props.loggedUser.username}!</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <button onClick={this.handleLogout}>Logout</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        {this.props.loggedUser.admin ? <NewCourse /> : null}
                        <br></br>
                        <br></br>
                        <br></br>
                        {this.props.loggedUser.admin ? <NewQuest /> : null}
                        <br></br>
                        <br></br>
                        <br></br>
                        <EditUserInformation user={this.props.loggedUser} />
                        <br></br>
                        <br></br>
                        <br></br>
                        <JoinCourse />
                        <br></br>
                        <br></br>
                        <br></br>
                        <button onClick={this.handleDeleteAccount}>Delete account</button>
                    </div>
                    :
                    <div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps, { removeUser, setLoggedUser })(Userpage)