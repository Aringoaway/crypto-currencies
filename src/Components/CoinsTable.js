import React, {useEffect} from "react";
import { useState } from "react";
import axios from "axios";
import {CoinList} from "../config/api";
import {Container, TableBody, TableContainer, TableRow, TextField, Typography} from "@material-ui/core";
import { TableHead } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const CoinsTable = () => {
    const [coins, setCoins] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState()

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

    const handleSearch = () => {
        return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
    }

    const useStyles = makeStyles(() => ({

    }))
    const classes = useStyles();

    return(
        <Container style={{textAlign: "center"}}>
            <Typography variant="h4" style={{margin: 18}}>
                Cryptocurrency
            </Typography>
            <TextField label="Search cryprocurrency"
                       variant="filled"
                       style={{marginBottom: 20, width: "100%",backgroundColor: "#fff"}}
                       onChange={(e)=> setSearch(e.target.value)}
            ></TextField>
            <TableContainer>
                <Table>
                    <TableHead style={{backgroundColor: '#fff'}}>
                        <TableRow>
                            {["Coin", "Symbol" , "Price", "1h", "24h", "7d", "Market Cap"]. map((head) => (
                                <TableCell style={{
                                    color: "000",
                                    fontWeight: "700"
                                }} key={head} align={head === "Coin" ? "" : "right"}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {handleSearch().map(row=>{
                            const profit = row.price_change_percentage_24h > 0;

                            return(
                                <TableRow
                                onClick={() => navigate(`/coins/${row.id}`)}
                                className={classes.row}
                                key={row.key}
                                >
                                    <TableCell component= 'th'>

                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </Container>
    )
}

export default CoinsTable;