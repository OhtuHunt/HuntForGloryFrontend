import React from 'react'
import { connect } from 'react-redux'
import { changeFieldToFilter } from '../reducers/fieldToFilterReducer'

class FieldToFilter extends React.Component {
    handleChange = (event) => {
        this.props.changeFieldToFilter(event.target.value)
    }

    render() {

        return (
            <div>
                <form onChange={this.handleChange}>
                <input type='radio' name='quest' value='' /> everything
                    <input type='radio' name='quest' value='name' /> name
                        <input type='radio' name='quest' value='course' /> course
                            <input type='radio' name='quest' value='type' /> type
</form>
            </div>
        )
    }
}

export default connect(null, { changeFieldToFilter })(FieldToFilter)