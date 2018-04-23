import React from 'react'
import { shallow, mount } from 'enzyme'
import ShowOne from './ShowOne'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from '../App'
import thunk from 'redux-thunk'

describe.only('<ShowOne />', () => {
    let store
    beforeAll(() => {
        const middlewares = [thunk]
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

    it('renders quests content correctly when quest is not started', () => {
        const quest = {
            id: "5ad791300599b800145439a0",
            usersStarted: [],
            name: "Ensimmäinen testi",
            description: "Eka testiquest",
            points: 10,
            type: "activation code",
            activationCode: "Test",
            deactivated: false,
            started: false,
            course: {
                _id: "5ad790df0599b8001454399d",
                name: "Test course"
            }
        }

        const showOneComponent = mount(<Provider store={store}>
            <ShowOne quest={quest} />
        </Provider>)

        const questInfoDiv = showOneComponent.find('.questInfo')
        const startButton = showOneComponent.find('.startButton')

        expect(questInfoDiv.text()).toContain(quest.name)
        expect(questInfoDiv.text()).toContain(quest.description)
        expect(questInfoDiv.text()).toContain(`Course: ${quest.course.name}`)
        expect(startButton.text()).toContain('Start quest')
        expect(startButton.length).toBe(1)
    })

    it('renders quests content correctly when quest is started', () => {
        const quest = {
            id: "5ad791300599b800145439a0",
            usersStarted: [],
            name: "Ensimmäinen testi",
            description: "Eka testiquest",
            points: 10,
            type: "activation code",
            activationCode: "Test",
            deactivated: false,
            started: true,
            course: {
                _id: "5ad790df0599b8001454399d",
                name: "Test course"
            }
        }

        const showOneComponent = mount(<Provider store={store}>
            <ShowOne quest={quest} />
        </Provider>)

        const questInfoDiv = showOneComponent.find('.questInfo')
        const startButton = showOneComponent.find('.startButton')
        const activationCodeForm = showOneComponent.find('.activationCodeForm')

        expect(questInfoDiv.text()).toContain(quest.name)
        expect(questInfoDiv.text()).toContain(quest.description)
        expect(questInfoDiv.text()).toContain(`Course: ${quest.course.name}`)
        expect(startButton.length).toBe(0)
        expect(activationCodeForm.length).toBe(1)
    })

    it('renders quests content correctly when quest is completed', () => {
        const quest = {
            id: "5ad791300599b800145439a0",
            usersStarted: [],
            name: "Ensimmäinen testi",
            description: "Eka testiquest",
            points: 10,
            type: "activation code",
            activationCode: "Test",
            deactivated: false,
            finished: true,
            course: {
                _id: "5ad790df0599b8001454399d",
                name: "Test course"
            }
        }

        const showOneComponent = mount(<Provider store={store}>
            <ShowOne quest={quest} />
        </Provider>)

        const questInfoDiv = showOneComponent.find('.questInfo')
        const startButton = showOneComponent.find('.startButton')
        const activationCodeForm = showOneComponent.find('.activationCodeForm')
        const questStatus = showOneComponent.find('.questStatus')

        expect(questInfoDiv.text()).toContain(quest.name)
        expect(questInfoDiv.text()).toContain(quest.description)
        expect(questInfoDiv.text()).toContain(`Course: ${quest.course.name}`)
        expect(startButton.length).toBe(0)
        expect(activationCodeForm.length).toBe(0)
        expect(questStatus.length).toBe(1)
        expect(questStatus.text()).toContain('Quest Completed!')
    })

    it('renders quests content correctly when quest is deactivated and not finished', () => {
        const quest = {
            id: "5ad791300599b800145439a0",
            usersStarted: [],
            name: "Ensimmäinen testi",
            description: "Eka testiquest",
            points: 10,
            type: "activation code",
            activationCode: "Test",
            deactivated: true,
            finished: false,
            course: {
                _id: "5ad790df0599b8001454399d",
                name: "Test course"
            }
        }

        const showOneComponent = mount(<Provider store={store}>
            <ShowOne quest={quest} />
        </Provider>)

        const questInfoDiv = showOneComponent.find('.questInfo')
        const startButton = showOneComponent.find('.startButton')
        const activationCodeForm = showOneComponent.find('.activationCodeForm')
        const questStatus = showOneComponent.find('.questStatus')

        expect(questInfoDiv.text()).toContain(quest.name)
        expect(questInfoDiv.text()).toContain(quest.description)
        expect(questInfoDiv.text()).toContain(`Course: ${quest.course.name}`)
        expect(startButton.length).toBe(0)
        expect(activationCodeForm.length).toBe(0)
        expect(questStatus.length).toBe(1)
        expect(questStatus.text()).toContain('This quest has been deactivated')
    })
})