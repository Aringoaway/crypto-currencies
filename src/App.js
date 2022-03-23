import './App.css';
import {BrowserRouter ,Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import AboutCoin from "./Pages/AboutCoin";
import { makeStyles } from '@material-ui/core/styles'

function App() {

    const useStyles = makeStyles(() => ({
        App: {
            backgroundImage: "linear-gradient(to right top, #520e59, #470c57, #3b0b54, #2f0a51, #21094e);",
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
              <Route path="/coins/:id" element={<AboutCoin/>}></Route>
          </Routes>
      </div>
  );
}

export default App;
