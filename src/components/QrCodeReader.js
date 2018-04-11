import React from 'react'
import QrReader from 'react-qr-reader'
import { setActivationCode } from '../reducers/activationCodeReducer'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'

class QrCodeReader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 300
        }
    }

    componentDidMount() {
        findDOMNode(this).scrollIntoView(false)
    }

    handleScan(data) {
        if (data) {
            this.props.setActivationCode(data)
            this.props.handleQR()
        }
    }

    handleError(error) {
        console.log(error)
    }
    render() {
        return (
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
