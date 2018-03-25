import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    render() {

        if (this.props.notification.length === 0) {
            return null
        }
        return (
            <div>
                <p>{this.props.notification}</p>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps)(Notification)