import React from 'react'
import QrReader from 'react-qr-reader'
import { setActivationCode } from '../reducers/activationCodeReducer'
import { connect } from 'react-redux'

class QrCodeReader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 300
        }
    }

    handleScan(data) {
        if(data) {
            this.props.setActivationCode(data)
        }
    }

    handleError(error) {
        console.log(error)
    }
    render() {
        return(
            <div>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan.bind(this)}
                    style={{ width: '100%' }}
                    />
            </div>
        )
    }
}
export default connect(null, { setActivationCode })(QrCodeReader)
