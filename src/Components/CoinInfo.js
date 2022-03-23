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
        // const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365');

        setHistoricData(data.prices);
    };


    console.log("datapricecoin id" , historicData);

    useEffect(() => {
        fetchHistoricData();
    }, []);


    // const lineChartData = {
    //     labels: ["October", "November", "December"],
    //     datasets: [
    //         {
    //             data: [8137119, 9431691, 10266674],
    //             label: "Infected",
    //             borderColor: "#3333ff",
    //             fill: true,
    //             lineTension: 0.5
    //         },
    //         {
    //             data: [1216410, 1371390, 1477380],
    //             label: "Deaths",
    //             borderColor: "#ff3333",
    //             backgroundColor: "rgba(255, 0, 0, 0.5)",
    //             fill: true,
    //             lineTension: 0.5
    //         }
    //     ]
    // };

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

    // return (
    //     <Line
    //         type="line"
    //         width={160}
    //         height={60}
    //         options={{
    //             title: {
    //                 display: true,
    //                 text: "COVID-19 Cases of Last 6 Months",
    //                 fontSize: 20
    //             },
    //             legend: {
    //                 display: true, //Is the legend shown?
    //                 position: "top" //Position of the legend.
    //             }
    //         }}
    //         data={lineChartData}
    //     />
    // );


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
                            {/*<Line*/}
                            {/*    type="line"*/}
                            {/*    width={160}*/}
                            {/*    height={60}*/}
                            {/*    options={{*/}
                            {/*        title: {*/}
                            {/*            display: true,*/}
                            {/*            text: "COVID-19 Cases of Last 6 Months",*/}
                            {/*            fontSize: 20*/}
                            {/*        },*/}
                            {/*        legend: {*/}
                            {/*            display: true, //Is the legend shown?*/}
                            {/*            position: "top" //Position of the legend.*/}
                            {/*        }*/}
                            {/*    }}*/}
                            {/*    data={lineChartData}*/}
                            {/*/>*/}

                            <div>hello</div>
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

                            />
                        </>
                    )
                }

            </div>

        </MuiThemeProvider>
    )
}

export default CoinInfo;