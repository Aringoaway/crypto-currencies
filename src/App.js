import './App.css';
import {BrowserRouter ,Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import AboutCoin from "./Pages/AboutCoin";
import { makeStyles } from '@material-ui/core/styles'

function App() {

    const useStyles = makeStyles(() => ({
        App: {
            backgroundImage: "linear-gradient(to left, #8a64e1, #7352d1, #5b40c2, #412eb2, #1d1da3);",
            color: "#fff",
            minHeight: "100vh",
        }
    }));

    const classes = useStyles();

  return (
      <div className={classes.App}>
          <Header/>
          <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route path="/coin/:id" element={<AboutCoin/>}></Route>
          </Routes>
      </div>
  );
}

export default App;
