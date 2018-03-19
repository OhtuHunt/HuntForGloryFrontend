import React from 'react'
import { Card, CardBody } from "react-simple-card";
import { NavLink } from 'react-router-dom'

const GenerateCard = ({ id, title, questType, points }) => {

    return (
            <NavLink to={`/quests/${id}`} style={{ cursor: 'pointer' }}>
                <Card style={{width:'auto'}}>
                    <CardBody>
                        <h2>{title}</h2>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td className="questType">{questType}</td>
                                    <td className="points">{points}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </NavLink>

    );
};

export default GenerateCard
