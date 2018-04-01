import React from 'react'
import { connect } from 'react-redux'

class ErrorMessage extends React.Component {

    render() {

        const errorMessageStyle = {
            borderStyle: 'solid',
            borderColor: '#ff4d4d',
            backgroundColor: ' #ffcccc'
        }

        if (this.props.errorMessage.length === 0) {
            return null
        }
        return (
            <div style={errorMessageStyle}>
                {this.props.errorMessage.map(error => <p key={error}> {error} </p>)}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps)(ErrorMessage)