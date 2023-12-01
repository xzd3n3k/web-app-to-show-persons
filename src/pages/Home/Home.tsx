import React, {ReactElement, useEffect, useReducer, useState} from "react";
import './Home.scss';
import TUsers from "../../Users";
import fetchAPI from "../../fetchAPI";
import TUser from "../../User";
import { UsersTable, Pagination } from "../../components";


const API: string = 'https://swapi.dev/api/people/';
let usersData : Array<TUser> = [];
let fetched: number = 0;
export default function Home(): ReactElement {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    //const [postsPerPage] = useState(10); would have been used in case items per page can be changed by user
    const itemsPerPage: number = 10;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const [filteredData, setFilteredData] = useState(Array<TUser>);
    const currentData: Array<TUser> = filteredData.slice(indexOfFirst, indexOfLast);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const fetchData = async (api: string) => {
        const data: TUsers | null = await fetchAPI(api);
        data?.results.forEach((result) => {usersData.push(result);fetched++;});
        forceUpdate();
        if (data?.next) {
            fetchData(data.next);
        } else {
            const jsonItems = JSON.stringify(usersData);
            localStorage.setItem('items', jsonItems);
            setIsLoaded(true);
            setFilteredData(searchData(usersData, ''));

            return;
        }
    }

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            if (storedItems.length === 0) {
                fetchData(API);
            } else {
                usersData = (JSON.parse(storedItems));
                setFilteredData(searchData(usersData, ''));
                setIsLoaded(true);
            }
        } else {
            fetchData(API);
        }
    }, []);

    function searchData(data: Array<TUser>, searchValue: string): Array<TUser> {
        return data.filter((user) => user.name.toLowerCase().includes(searchValue));
    }

    return (
        <div className="home-container">
            {isLoaded ?
                <div>
                    <span className="top-bar">
                    <button onClick={()=>{localStorage.removeItem('items'); usersData = []; setIsLoaded(false); fetchData(API);}}>Fetch data</button>
                        <span className="search-container">
                            <label>Search:</label>
                            <input className="search-input" type="text" onChange={event => {setFilteredData(searchData(usersData, event.target.value.toLowerCase())); setCurrentPage(1)}}/>
                        </span>
                    </span>
                    <UsersTable data={currentData}/>
                    <Pagination usersPerPage={itemsPerPage} totalUsers={filteredData.length} paginate={paginate} currentPage={currentPage}/>
                </div> :
                <div className="loading-container">
                    Loading...<br/>Loaded {fetched} users.
                </div>}
        </div>
    )
}
