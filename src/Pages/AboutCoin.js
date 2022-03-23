import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SingleCoin} from "../config/api";
import {makeStyles} from "@material-ui/core/styles";
import CoinInfo from "../Components/CoinInfo";
import {Typography} from "@material-ui/core";

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
        }
    }))

    const classes = useStyles();


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
            </div>

        {/*    chart    */}
            <CoinInfo coin={coin}/>
        </div>
    )
}

export default AboutCoin;