import React, {useState, useEffect} from "react";
import {HistoricalChart} from "../config/api";
import axios from "axios";
import {CircularProgress, createTheme, MuiThemeProvider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    // const [days, setDays] = useState(1);

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id));


        setHistoricData(data.prices);
    };


    console.log("datapricecoin id" , historicData);

    useEffect(() => {
        fetchHistoricData();
    }, []);



    const useStyles = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },
        },
    }));

    const classes = useStyles();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark",
        },
    });



    return(
        <MuiThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicData ? (
                        <CircularProgress
                        style={{color: "#fff"}}
                        size={150}
                        thickness={1}
                        />
                    ) : (
                        <>
                            <Line
                                data={{
                                    labels: historicData.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time =
                                            date.getHours() > 12
                                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return coin.id === 1 ? time : date.toLocaleDateString();
                                    }),
                                    datasets: [
                                        {
                                            data: historicData.map((coin) => coin[1]),
                                            label: "Price Past 365 Days  in usd",
                                            borderColor: "#EEBC1D",
                                        },
                                    ],
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        },
                                    },
                                }}
                            />
                        </>
                    )
                }

            </div>

        </MuiThemeProvider>
    )
}

export default CoinInfo;