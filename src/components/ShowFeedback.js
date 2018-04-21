import { connect } from 'react-redux'
import React from 'react'
import { markFeedbackRead } from '../reducers/feedbackReducer'

class ShowFeedback extends React.Component {

    handleMarkAsReadClick = async (event) => {
        event.preventDefault()
        console.log(this.props.feedback.id)
        await this.props.markFeedbackRead(this.props.feedback.id)
        console.log(this.props.feedbacks)
    }

    render() {

        const divStyle = {
            marginLeft:'auto',
            marginRight:'auto',
            padding: 5,
            width: 150,
            marginTop: 10,
            color: 'green',
            fontWeight: 'bold',
            borderStyle: 'solid',
            borderWidth: 2
        }
        const buttonDivStyle = {
            marginTop: 10
        }
        if (this.props.feedback === undefined) {
            return (
                <div></div>
            )
        }
        if (!this.props.loggedUser.admin) {
            return (
                <h3> Only admins can view this content </h3>
            )
        }
        console.log(this.props.feedback.read)
        return (
            <div style={{ height: window.innerHeight * 0.9, overflow: 'auto' }}>
                <h3> {this.props.feedback.title} </h3>
                <div> {this.props.feedback.content} </div>

                {this.props.feedback.read ?
                    <div style={divStyle}> MARKED AS READ </div> :
                    <div style={buttonDivStyle}>
                        <button onClick={this.handleMarkAsReadClick}> Mark as read </button>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser,
        feedbacks: state.feedbacks
    }
}

export default connect(mapStateToProps, { markFeedbackRead })(ShowFeedback)