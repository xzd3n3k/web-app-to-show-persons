import React, {ReactElement} from "react";
import './Pagination.scss'

interface IProps {
    usersPerPage: number;
    totalUsers: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

export default function Pagination({ usersPerPage, totalUsers, paginate, currentPage }: IProps): ReactElement {
    const pageNumbers: Array<number> = [];

    for (let i = 1; i <= Math.ceil(totalUsers/usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className="page-item">
                        <a onClick={() => paginate(pageNumber)} className={`page-link ${pageNumber === currentPage ? "selected" : ""}`}>
                            {pageNumber}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
