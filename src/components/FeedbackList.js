import { connect } from 'react-redux'
import React from 'react'

class FeedbackList extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        // Styles for read and not read feedback divs
        const listStyleNotRead = {
            paddingTop: 17,
            paddingBottom: 17,
            borderStyle: 'solid',
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: '#ffff80',
            borderWidth: 1.5
        }

        const listStyleRead = {
            paddingTop: 17,
            paddingBottom: 17,
            borderStyle: 'solid',
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: '#80ffaa',
            borderWidth: 1.5
        }
        // Makes the div yellow if feedback is not read, otherwise green
        if (this.props.loggedUser) {
            if (this.props.loggedUser.admin) {
                return (
                    <div>
                        {this.props.feedbacks.map(f => {
                            return f.read ?
                                <div key={f.id} style={listStyleRead}>
                                    {f.title}
                                </div>
                                :
                                <div key={f.id} style={listStyleNotRead}>
                                    {f.title}
                                </div>
                        })}
                    </div>
                )
            }
            return (
                <h3> Only admins can view this content </h3>
            )
        }
        return (
            <h3> You have to be logged in </h3>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        feedbacks: state.feedbacks,
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(FeedbackList)