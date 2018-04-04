import React from 'react'
import { Card, CardBody } from 'react-simple-card'
import { NavLink } from 'react-router-dom'

const GenerateCard = ({ quest }) => {

    return (
        <NavLink to={`/quests/${quest.id}`} style={{ cursor: 'pointer' }}>
            <Card style={{ width: 'auto' }}>
                <CardBody>
                    <h2>{quest.name}</h2>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td className="questType">{quest.type}</td>
                                <td className="questCourse">{quest.course.name}</td>
                                <td className="points">{quest.points}</td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </NavLink>

    )
};

export default GenerateCard
