import React from 'react'
import { Card, CardBody } from "react-simple-card";
import { Link } from 'react-router-dom'

const GenerateCard = ({ id, title, questType, points, clickHandler }) => {

    return (
            <Link to={`/quests/${id}`} onClick={clickHandler} style={{ cursor: 'pointer' }}>
                <Card className="listingCard">
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
            </Link>

    );
};

export default GenerateCard
