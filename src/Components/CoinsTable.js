import React, {useEffect} from "react";
import { useState } from "react";
import axios from "axios";
import {CoinList} from "../config/api";
import {Container, TableContainer, TableRow, Typography} from "@material-ui/core";
import { TableHead } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableCell } from '@material-ui/core';

const CoinsTable = () => {
    const [coins, setCoins] = React.useState([]);
    const [loading, setLoading] = useState(false);

    // async function fetchData() {
    //     setLoading(true)
    //     const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d')
    //     setCoins(coinData.data)
    //     setLoading(false)
    // }
    // console.log(coins);
    //
    // useEffect(() => {
    //     // fetchData();
    // }, );

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d')
            setCoins(coinData.data)
            setLoading(false)
        }
        // fetchData();
        // console.log(coins)
    }, );

    return(
        <Container style={{textAlign: "center"}}>
            <Typography variant="h4" style={{margin: 18}}>
                Cryptocurrency
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead style={{backgroundColor: '#fff'}}>
                        <TableRow>
                            {["Coin", "Symbol" , "Price", "1h", "24h", "7d", , "Market Cap"]. map((head) => (
                                <TableCell style={{
                                    color: "000",
                                    fontWeight: "700"
                                }} key={head} align={head === "Coin" ? "" : "right"}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>



                </Table>
            </TableContainer>
        </Container>
    )
}

export default CoinsTable;