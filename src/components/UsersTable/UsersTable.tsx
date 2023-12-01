import React, { ReactElement } from 'react';
import './UsersTable.scss';
import TUser from "../../User";

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
                                <tr key={index}>
                                    <td>{person.name}</td>
                                    <td>{person.birth_year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> :
                <div>
                    Empty data source
                </div>}
        </div>
    );
}
