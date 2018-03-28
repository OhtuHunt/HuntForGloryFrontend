import React from 'react'
import { connect } from 'react-redux'
import { changeFieldToFilter } from '../reducers/fieldToFilterReducer'

class FieldToFilter extends React.Component {
    handleChange = (event) => {
        this.props.changeFieldToFilter(event.target.value)
    }

    render() {

        return (
            // <div>
            //     <form onChange={this.handleChange}>
            //         <input type='radio' name='quest' value='' /> everything
            //         <input type='radio' name='quest' value='name' /> name
            //         <input type='radio' name='quest' value='course' /> course
            //         <input type='radio' name='quest' value='type' /> type
            //         <input type='radio' name='quest' value='not_done' /> not done
            //     </form>
            // </div>
            <div>
                <form onChange={this.handleChange}>
                    <label className='filterLabel'> Everything
                    <input type='radio' name='quest' value='' /><span className='checkmark'></span>
                    </label>
                    <label className='filterLabel'> Name
                    <input type='radio' name='quest' value='name' /><span className='checkmark'></span>
                    </label>
                    <label className='filterLabel'> Course
                    <input type='radio' name='quest' value='course' /><span className='checkmark'></span>
                    </label>
                    <label className='filterLabel'> Type
                    <input type='radio' name='quest' value='type' /><span className='checkmark'></span>
                    </label>
                    <label className='filterLabel'> Not done
                    <input type='radio' name='quest' value='not_done' /><span className='checkmark'></span>
                    </label>
                </form>
            </div>
        )
    }
}

export default connect(null, { changeFieldToFilter })(FieldToFilter)