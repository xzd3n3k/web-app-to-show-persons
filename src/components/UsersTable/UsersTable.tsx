import React, { ReactElement } from 'react';
import './UsersTable.scss';
import TUser from "../../User";
import getUserId from "../../getUserId";

interface IProps {
    data: Array<TUser>;
}

export default function UsersTable({data}: IProps): ReactElement {

    return (
        <div>
            {(data) ?
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Born</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.map((person, index) => (
                                <tr key={index} onClick={() => {window.location.href = `/detail?id=${getUserId(person)}`}}>
                                    <td>{person.name}</td>
                                    <td>{person.birth_year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> :
                <div className="loading-container">
                    Empty data source
                </div>}
        </div>
    );
}
