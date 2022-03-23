import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SingleCoin} from "../config/api";

const AboutCoin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    }

    console.log(coin);

    useEffect(() => {
        fetchCoin();
    }, []);



    return (
        <div>
            about coin page
        </div>
    )
}

export default AboutCoin;