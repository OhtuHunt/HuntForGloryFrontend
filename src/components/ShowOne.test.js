import React from 'react'
import { shallow, mount } from 'enzyme'
import ShowOne from './ShowOne'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from '../App'

describe.only('<ShowOne />', () => {
    let store
    beforeAll(() => {
        const middlewares = []
        const mockStore = configureStore(middlewares)
        const initialState = {
            loggedUser: {
                courses: [
                    {
                        course: "5ad790df0599b8001454399d",
                        name: "Test course"
                    }
                ]
            }
        }
        store = mockStore(initialState)
    })

    it('renders quests content', () => {
        const quest = {
            id: "5ad791300599b800145439a0",
            usersStarted: [],
            name: "Ensimmäinen testi",
            description: "Eka testiquest",
            points: 10,
            type: "activation code",
            activationCode: "Test",
            deactivated: false,
            course: {
                _id: "5ad790df0599b8001454399d",
                name: "Test course"
            }
        }

        const showOneComponent = mount(<Provider store={store}>
            <ShowOne quest={quest} />
        </Provider>)

        const questInfoDiv = showOneComponent.find('.questInfo')

        expect(questInfoDiv.text()).toContain(quest.name)
        expect(questInfoDiv.text()).toContain(quest.description)
        expect(questInfoDiv.text()).toContain(`Course: ${quest.course.name}`)
    })

    it('starts quest correctly', () => {
        const quest = {
            id: "5ad791300599b800145439a0",
            usersStarted: [],
            name: "Ensimmäinen testi",
            description: "Eka testiquest",
            points: 10,
            type: "activation code",
            activationCode: "Test",
            deactivated: false,
            course: {
                _id: "5ad790df0599b8001454399d",
                name: "Test course"
            }
        }

        const showOneComponent = mount(<Provider store={store}>
            <App store={store} />
        </Provider>)

        //const startButton = showOneComponent.find('.startButton')
        //startButton.simulate('click')

    })
})