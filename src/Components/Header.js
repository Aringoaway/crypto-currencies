import React from "react";
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        fontSize: "36px",
        fontWeight: "bold",
        cursor: "pointer",
        textAlign: "center"
    }
}))

const Header = () => {

    const classes = useStyles();

    return(
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography className={classes.title}>
                        Cryptocurrencies
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;