import React from 'react'
import { Card, CardBody } from "react-simple-card";

const GenerateCard = ({ title, questType, points, clickHandler}) => {
    return (
        <div onClick={clickHandler} style={{cursor: 'pointer'}}>
                <Card className="listingCard">
                    <CardBody>
                        <h2>{title}</h2>
                        <table style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <td className="questType">{questType}</td>
                                    <td className="points">{points}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
        </div>
    );
};

export default GenerateCard
