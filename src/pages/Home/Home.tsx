import React, {ReactElement, useEffect, useState} from "react";
import TUsers from "../../Users";
import fetchAPI from "../../fetchAPI";
import TWorld from "../../World";

import TUser from "../../User";
import {UsersTable} from "../../components";
import user from "../../User";
import Pagination from "../../components/Pagination/Pagination";


const API: string = 'https://swapi.dev/api/people/';
let usersData : Array<TUser> = [];
export default function Home(): ReactElement {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    //const [postsPerPage] = useState(10); would have been used in case items per page can be changed by user
    const itemsPerPage: number = 10;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentData = usersData.slice(indexOfFirst, indexOfLast);
    const [totalPagesCount, setTotalPagesCount] = useState(1);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {

        const fetchData = async (api: string) => {
            const data: TUsers | null = await fetchAPI(api);
            data?.results.forEach((result) => {usersData.push(result);});
            if (data?.next) {
                fetchData(data.next);
            } else {
                setIsLoaded(true);

                return;
            }
        }

        fetchData(API);

    }, []);

    console.log(currentData);

    return (
        <div>
            {isLoaded ? <div><UsersTable data={currentData}/><Pagination usersPerPage={itemsPerPage} totalUsers={usersData.length} paginate={paginate}/></div> : <center>Loading...</center>}
        </div>
    )
}
