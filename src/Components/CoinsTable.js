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
import {Pagination} from "@material-ui/lab";

const CoinsTable = () => {
    const [coins, setCoins] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState();
    const [page, setPage] = useState(1);


   function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
            setCoins(coinData.data)
            setLoading(false)
        }
        fetchData();
        // console.log(coins)
    }, );

    const handleSearch = () => {
        return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
    }

    const useStyles = makeStyles(() => ({
        row: {
            cursor: "pointer",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "#fff"
            },

        }
    }));
    const classes = useStyles();

    return(
        <Container style={{textAlign: "center"}}>
            <Typography variant="h4" style={{margin: 18}}>
                Cryptocurrency
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead style={{backgroundColor: '#fff'}}>
                        <TableRow>
                            {["Coin", "Symbol" , "Price", "1h", "24h", "7d", "Market Cap"]. map((head) => (
                                <TableCell
                                    style={{
                                        color: "black",
                                        fontWeight: "700",
                                    }}
                                    key={head}
                                    align={head === "Coin" ? "" : "right"}
                                >
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {coins
                            .slice((page-1) * 10, (page-1) * 10 + 10)
                            .map((row) => {
                            const profit24h = row.price_change_percentage_24h > 0;
                            const profit7d = row.price_change_percentage_7d_in_currency > 0;
                            const profit1h = row.price_change_percentage_1h_in_currency > 0;

                            return(
                                <TableRow
                                onClick={() => navigate(`/coins/${row.id}`)}
                                className={classes.row}
                                key={row.name}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 15,
                                        }}>
                                        <img src={row?.image}
                                        alt={row.name}
                                        height="50"
                                        style={{marginBottom: 10}}/>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{
                                                    textTransform: "capitalize",
                                                    color: "#fff",
                                                    fontSize: 18}}>
                                              {row.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                            <span style={{
                                                textTransform: "uppercase",
                                                color: "#fff",
                                                fontSize: 16}}>
                                              {row.symbol}
                                            </span>
                                    </TableCell>

                                    <TableCell>
                                            <span style={{
                                                textTransform: "uppercase",
                                                color: "#fff",
                                                fontSize: 16}}>
                                              ${numberWithCommas(row.current_price.toFixed(2))}
                                            </span>
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        style={{color: profit1h > 0 ? "#34c800" : "#FB5C5C", fontWeight: 400}}>
                                        {profit1h && "+"}
                                        {row.price_change_percentage_1h_in_currency.toFixed(2)}%
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        style={{color: profit24h > 0 ? "#34c800" : "#FB5C5C", fontWeight: 400}}>
                                        {profit24h && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        style={{color: profit7d > 0 ? "#34c800" : "#FB5C5C", fontWeight: 400}}>
                                        {profit7d && "+"}
                                        {row.price_change_percentage_7d_in_currency.toFixed(2)}%
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        style={{color: profit1h > 0 ? "#34c800" : "#FB5C5C", fontWeight: 400}}>
                                        ${numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>

            <Pagination
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff"
            }}
                classes={{ul: classes.pagination}}
                count={10}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450)
                }}
            />
        </Container>
    )
}

export default CoinsTable;