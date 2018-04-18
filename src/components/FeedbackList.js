import { connect } from 'react-redux'
import React from 'react'
import { NavLink } from 'react-router-dom'

class FeedbackList extends React.Component {

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
                    <div style={{height: window.innerHeight * 0.9, overflow: 'auto'}}>
                        {this.props.feedbacks.map(f => 
                                <NavLink key={f.id} exact to={`/feedbacks/${f.id}`} style={{ cursor: 'pointer' }}>
                                {f.read ?
                                    <div style={listStyleRead}>
                                        {f.title}
                                    </div>
                                :
                                    <div style={listStyleNotRead}>
                                        {f.title}
                                    </div>}
                                </NavLink>
                        )}
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