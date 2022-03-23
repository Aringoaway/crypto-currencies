import React, {useState, useEffect} from "react";
import {HistoricalChart} from "../config/api";
import axios from "axios";

const CoinInfo = ({coin}) => {
    const [hisloricData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days));

        setHistoricalData(data.prices)
    }

    useEffect(() => {
        fetchHistoricData();
    }, [days]);



    return(
        <div>Coin info</div>
    )
}

export default CoinInfo;