import React, {ReactElement} from "react";

interface IProps {
    usersPerPage: number;
    totalUsers: number;
    paginate: (pageNumber: number) => void;
}

export default function Pagination({ usersPerPage, totalUsers, paginate }: IProps): ReactElement {
    const pageNumbers: Array<number> = [];

    for (let i = 0; i <= Math.ceil(totalUsers/usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className="page-item">
                        <a onClick={() => paginate(pageNumber)} className="page-link">
                            {pageNumber}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
