import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SingleCoin} from "../config/api";
import {makeStyles} from "@material-ui/core/styles";
import CoinInfo from "../Components/CoinInfo";
import {LinearProgress, List, Typography} from "@material-ui/core";

const AboutCoin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    }

    console.log(coin);

    useEffect(() => {
        fetchCoin();
    }, []);


    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%"
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid #fff"
        },
        heading: {
            fontWeight: 700,
            marginBottom: 20
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        }
    }))

    const classes = useStyles();


    if (!coin) return <LinearProgress style={{backgroundColor: "#fff"}}/>


    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                src={coin?.image.large}
                alt={coin?.name}
                height="100"
                style={{marginBottom: 20}}
                />
                <Typography variant="h4" className={classes.heading}>
                    {coin?.name}
                </Typography>
                <div className={classes.marketData}>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Symbol:
                        </Typography>

                        <Typography variant="h5">
                            {coin?.symbol}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Genesis date:
                        </Typography>

                        <Typography variant="h5">
                            {coin?.genesis_date}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Market rank:
                        </Typography>

                        <Typography variant="h5">
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Circulating supply:
                        </Typography>

                        <Typography variant="h5">
                            {coin?.market_data.circulating_supply.toFixed()}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Market cap:
                        </Typography>

                        <Typography variant="h5">
                            {" "}
                            ${numberWithCommas(coin?.market_data.market_cap.usd)}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            Currnet price:
                        </Typography>

                        <Typography variant="h5">
                            {" "}
                            ${numberWithCommas(coin?.market_data.current_price.usd.toFixed())}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            All time hign:
                        </Typography>

                        <Typography variant="h5">
                            {" "}
                            ${numberWithCommas(coin?.market_data.ath.usd.toFixed())}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            24h change:
                        </Typography>

                        <Typography variant="h5">
                            ${numberWithCommas(coin?.market_data.market_cap_change_percentage_24h.toString().slice(0, -4))}
                        </Typography>
                    </span>

                    <span style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
                        <Typography variant="h6" className={classes.heading}>
                            7d change:
                        </Typography>

                        <Typography variant="h5">
                            {" "}
                            ${numberWithCommas(coin?.market_data.price_change_percentage_7d.toString().slice(0, -4))}
                        </Typography>
                    </span>

                </div>

            </div>

        {/*    chart    */}
            <CoinInfo coin={coin}/>
        </div>
    )
}

export default AboutCoin;