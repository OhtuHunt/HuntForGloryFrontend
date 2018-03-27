import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'
import { Card, CardBody } from 'react-simple-card'
import FieldToFilter from './FieldToFilter'

class Filter extends React.Component {
    handleChange = (event) => {
        this.props.changeFilter(event.target.value)
    }

    render() {
        const style = {
            width: 'auto',
            marginBottom: 2
        }

        return (
            <div>
                <Card style={style}>
                    <CardBody>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    {/* One line version needs to be adjusted for mobile view */}
                                    {/* <td>filter based on </td>
                                    <td><FieldToFilter /></td>
                                    <td><input onChange={this.handleChange} /></td> */}
                                    <div>filter based on <FieldToFilter /> <input onChange={this.handleChange} /></div>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default connect(null, { changeFilter })(Filter)