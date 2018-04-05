import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'
import { Card, CardBody } from 'react-simple-card'
import { changeFieldToFilter } from '../reducers/fieldToFilterReducer'
import { changeDone } from '../reducers/doneFilterReducer'

class Filter extends React.Component {
    handleFilterChange = (event) => {
        this.props.changeFilter(event.target.value)
    }
    handleFieldChange = (event) => {
        this.props.changeFieldToFilter(event.target.value)
    }

    handleDoneChange = (event) => {
        this.props.changeDone()
    }

    render() {
        const style = {
            width: 'auto',
            marginBottom: 2
        }

        return (
            <div>
                <Card style={style}>
                    <CardBody style={{ padding: 0 }}>
                        <table style={{ width: '100%', alignContent: 'left' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <label style={{ fontSize: 12 }}>
                                            not done
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="switch" onChange={this.handleDoneChange}>
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div className='custom-select' style={{ width: '100%' }}>
                                            <select name='fieldToFilter' onChange={this.handleFieldChange}>
                                                <option value=''>Filter by..</option>
                                                <option value=''>Everything</option>
                                                <option value='name'>Name</option>
                                                <option value='course'>Course</option>
                                                <option value='type'>Type</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <input type='text' placeholder='Write here..' onChange={this.handleFilterChange} style={{ width: '90%' }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default connect(null, { changeFilter, changeFieldToFilter, changeDone })(Filter)