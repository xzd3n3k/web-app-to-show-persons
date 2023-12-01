import React, {ReactElement, useEffect, useReducer} from "react";
import './Detail.scss';
import { useLocation } from "react-router-dom";
import TUser from "../../User";
import getUserId from "../../getUserId";
import fetchAPI from "../../fetchAPI";
import TWorld from "../../World";

let homeworld: TWorld;
export default function Detail(): ReactElement {

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const storedItems = localStorage.getItem('items');
    const usersData = (JSON.parse(storedItems? storedItems : ''));

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const id = params.get("id");
    const filteredUser = id ? usersData.find((user: TUser) => parseInt(id, 10) === getUserId(user)) : null;

    const fetchHomeworld = async (api: string) => {
        const data: TWorld | null = await fetchAPI(api);
        if (data) {
            homeworld = data;
        }
        forceUpdate();
        return;
        }

    useEffect(() => {
        fetchHomeworld(filteredUser.homeworld);
    }, []);

    return (
        <div>
            <button className="top-left-margin" onClick={() => {window.location.href = "/"}}>Back</button>
            { filteredUser ?
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Born</th>
                            <th>Height</th>
                            <th>Mass</th>
                            <th>Hair color</th>
                            <th>Skin color</th>
                            <th>Eye color</th>
                            <th>Gender</th>
                            <th>World</th>
                            <th>Terrain</th>
                            <th>Climate</th>
                            <th>Population</th>
                        </tr>
                        </thead>
                        <tbody>
                        {id ?
                            <tr className="no-cursor">
                                <td>{filteredUser.name}</td>
                                <td>{filteredUser.birth_year}</td>
                                <td>{filteredUser.height}</td>
                                <td>{filteredUser.mass}</td>
                                <td>{filteredUser.hair_color}</td>
                                <td>{filteredUser.skin_color}</td>
                                <td>{filteredUser.eye_color}</td>
                                <td>{filteredUser.gender}</td>
                                <td>{homeworld?.name}</td>
                                <td>{homeworld?.terrain}</td>
                                <td>{homeworld?.climate}</td>
                                <td>{homeworld?.population}</td>
                            </tr>
                            : 'Wrong id'}
                        </tbody>
                    </table>
                </div> :
                <div className="loading-container">
                    NOT FOUND
                </div>}
        </div>
    )
}
