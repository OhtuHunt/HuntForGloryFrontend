import React from 'react'
import NewQuest from './NewQuest'
import NewCourse from './NewCourse'
import EditUserInformation from './EditUserInformation'
import { removeUser } from '../reducers/usersReducer'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { connect } from 'react-redux'
import JoinCourse from './JoinCourse'
import FeedbackForm from './FeedbackForm'
import subscriptionService from '../services/subscription'
import PushNotificationForm from './PushNotificationForm'

class Userpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.isSubscribed()
    }

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

    handleDisableNotifications = async (event) => {
        event.preventDefault()
        this.disableButton.disabled = true
        const swReg = await navigator.serviceWorker.ready
        const PushSubscription = await swReg.pushManager.getSubscription()
        if (PushSubscription) {
            PushSubscription.unsubscribe()
            this.disableButton.disabled = false
            this.setState({
                subscribed: false
            })
        }
    }

    handleEnableNotifications = async (event) => {
        event.preventDefault()
        this.enableButton.disabled = true
        const applicationServerPublicKey = 'BP7Qda2PFbhXlbC4UDwHWjicJJLKTUE3f_pCFlkXYg4CIgnu8NF6CMTRRPkxx62FJ83m4zHKfXYjB5cn6OeeYk4'
        const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey)
        const swReg = await  navigator.serviceWorker.ready
        await swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
        const pushSubscription = await swReg.pushManager.getSubscription()
        subscriptionService.sendSubscription(pushSubscription)
        this.enableButton.disabled = false
        this.setState({
            subscribed: true
        })
    }

    isSubscribed = async () => {
        const swReg = await navigator.serviceWorker.ready
        const PushSubscription = await swReg.pushManager.getSubscription()
        if (PushSubscription) {
            this.setState({
                subscribed: true
            })
        } else {
            this.setState({
                subscribed: false
            })
        }
    }

    urlB64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
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
                        {this.props.loggedUser.admin ? <div>
                            <br></br>
                            <NewCourse />
                            <br></br>
                            <NewQuest />
                            <br></br>
                            <PushNotificationForm />
                            <br></br>
                        </div>
                            :
                            <br></br>
                        }
                        <EditUserInformation user={this.props.loggedUser} />
                        <br></br>
                        <JoinCourse />
                        <br></br>
                        <FeedbackForm user={this.props.loggedUser} />
                        <br></br>
                        {this.state.subscribed ?
                            <button ref={disableButton => { this.disableButton = disableButton; }} onClick={this.handleDisableNotifications}>Disable notifications</button>
                            :
                            <button ref={enableButton => { this.enableButton = enableButton; }} onClick={this.handleEnableNotifications}>Enable notifications</button>
                        }
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