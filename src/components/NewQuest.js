import React from 'react'
import Toggleable from './Toggleable'
import { notify } from '../reducers/notificationReducer'
import { createQuest } from '../reducers/questReducer'
import { connect } from 'react-redux'
import '../index.css';
import validateQuest from '../validators/questValidator'
import { showErrors } from '../reducers/errorMessageReducer'

const QuestForm = ({ onSubmit, handleChange, name, description, points, type, activationCode, course, courses, latitude, longitude, radius }) => {
	return (
		<div className='createform'>
			<h2>create new quest</h2>

			<form onSubmit={onSubmit}>

				<div className='form-group'>

					<p>course</p>
					<select name='course' value={course} onChange={handleChange}>
						{courses.map(function (course) {
							return (
								<option key={course.id} value={course.id}>{course.name}</option>
							)
						})}
					</select>
				</div>

				<div>
					<p>name</p>
					<input
						type='text'
						name='name'
						value={name}
						onChange={handleChange}
					/>
				</div>
				<div>
					<p>description</p>
					<input
						type='textarea'
						name='description'
						value={description}
						onChange={handleChange}
					/>
				</div>
				<div>
					<p>points</p>
					<input
						type='number'
						name='points'
						value={points}
						onChange={handleChange}
					/>
				</div>
				<div>
					<p>type</p>
					<label>
						<input type='radio' name='type' value='location' onChange={handleChange} />
						Location
                        <input type='radio' name='type' value='activation code' onChange={handleChange} />
						Activation Code
                    </label>
				</div>
				{type === 'activation code' ?
					<div>
						<p>activationcode</p>
						<input
							type='text'
							name='activationCode'
							value={activationCode}
							onChange={handleChange}
						/>
					</div>
					:
					<div>
						<p> latitude </p>
						<input
							type='number'
							name='latitude'
							value={latitude}
							onChange={handleChange}
						/>
						<p> longitude </p>
						<input
							type='number'
							name='longitude'
							value={longitude}
							onChange={handleChange}
						/>
						<p> radius </p>
						<input
							type='number'
							name='radius'
							value={radius}
							onChange={handleChange}
						/>
					</div>}

				<button type='submit'>create</button>
			</form>
		</div>
	)
}

class NewQuest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			description: '',
			points: 0,
			type: 'activation code',
			activationCode: '',
			latitude: '',
			longitude: '',
			radius: '',
			course: this.props.courses[0] ? this.props.courses[0].id : undefined
		}
	}

	formVisibility = () => {
		this.setState({ visible: !this.state.visible })
	}

	addQuest = async (event) => {
		event.preventDefault()

		let activationCode = this.state.activationCode

		if (this.state.type === 'location') {
			activationCode = { lat: this.state.latitude, lng: this.state.longitude, radius: this.state.radius }
		}

		const questObject = {
			name: this.state.name,
			description: this.state.description,
			points: this.state.points,
			type: this.state.type,
			activationCode: activationCode,
			course: this.state.course
		}

		let errors = validateQuest(questObject)
		
		if (errors.length > 0) {
			this.props.showErrors(errors, 5000)
			window.scrollTo(0, 0)
			return
		}

		this.questForm.toggleVisibility()

		this.props.createQuest(questObject)
		this.props.notify(`${questObject.name} has been created.`, 4000)

		this.setState({
			name: '',
			description: '',
			points: 0,
			type: 'activation code',
			activationCode: '',
			course: this.props.courses[0] ? this.props.courses[0].id : undefined,
			latitude: '',
			longitude: '',
			radius: ''
		})
		window.scrollTo(0, 0)
	}

	handleQuestChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}


	render() {
		return (
			<div>
				<Toggleable buttonLabel='New quest' cancelButtonLabel='Cancel' ref={component => this.questForm = component}>
					{this.props.courses[0] ?
						<QuestForm
							onSubmit={this.addQuest}
							handleChange={this.handleQuestChange}
							name={this.state.name}
							description={this.state.description}
							points={this.state.points}
							type={this.state.type}
							activationCode={this.state.activationCode}
							course={this.state.course}
							courses={this.props.courses}
							latitude={this.state.latitude}
							longitude={this.state.longitude}
							radius={this.state.radius}
						/> :
						<div> There are no courses available at the moment. If you want to create a new quest, you first have to create a course </div>}
				</Toggleable>
			</div>
		)


	}
}

const mapStateToProps = (state) => {
	return {
		courses: state.courses,
	}
}

export default connect(mapStateToProps,
	{ createQuest, notify, showErrors })(NewQuest)