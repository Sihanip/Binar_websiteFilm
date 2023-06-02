import React, {useCallback, useState, useEffect} from 'react';

import './page-header.scss';
import bg from '../../assets/footer-bg.jpg';
import { useNavigate } from 'react-router-dom';
import Input from "../input/Input";
import { category } from "../../api/tmdbApi";
import Button from "../button/Button";


const PageHeader = props => {
    return (
        <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
            <h2>{props.children}</h2>
        </div>
    );
}

export default PageHeader;

export const MovieSearch = (props) => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
        navigate(`/${category.movie}/search/${keyword}`);
        }
        if (keyword.trim().length > 0) {
        navigate(`/${category.tv}/search/${keyword}`);
        }
    }, [keyword, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            goToSearch();
        }
        };

        document.addEventListener("keyup", enterEvent);
        return () => {
        document.removeEventListener("keyup", enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
        <Input type="text" placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            <Button className="small" onClick={goToSearch}>
            Search
            </Button>
        </div>
    );
};