import { connect } from 'react-redux'
import React from 'react'
import { NavLink } from 'react-router-dom'

class ShowFeedback extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
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
        return (
            <div>
                <h3> {this.props.feedback.title} </h3>
                <div> {this.props.feedback.content} </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(ShowFeedback)