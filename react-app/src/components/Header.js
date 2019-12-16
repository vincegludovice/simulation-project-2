import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Chart from "./Chart";
import Investment from "./Investment_Tracking/InvestmentIndex";
import ContentIndex from "./Content/ContentIndex";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import walletImg from "../images/wallet.png";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 8
  },
  content: {
    flex: "1 0 auto",
    paddingTop: 4
  },
  cover: {
    width: 151
  }
}));
export const circulatingFormat = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
export default function Waves() {
  const [page, setPage] = React.useState(1);
  const classes = useStyles();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios.get(`http://localhost:4000/transactions`).then(response => {
      let initBalance = 0;
      response.data.forEach(newVal => {
        if (newVal.buy)
          initBalance = Number(initBalance) + Number(newVal.totalAmount);
        else {
          initBalance = Number(initBalance) - Number(newVal.totalAmount);
        }
      });
      setBalance(initBalance);
    });
  });
  return (
    <BrowserRouter>
      <header className="header">
        <div className="container flex justify-between px-4">
          <div style={{ paddingTop: 16 }}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cover}
                title="Live from space album cover"
              >
                <img
                  style={{ maxWidth: "100%", height: "auto", paddingTop: 6 }}
                  src={walletImg}
                  alt="Wallet"
                />
              </CardMedia>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {balance < 50 ? 0 : balance.toLocaleString()} USD
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Amount Invested
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </div>
          <ol className="nav">
            <li>
              <Link to="/">Coin Lists</Link>
            </li>
            <li>
              <Link to="/investment">Investment Tracking</Link>
            </li>
            {/* <li>
              <Link to="/faq">FAQ</Link>
            </li> */}
          </ol>
        </div>
      </header>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <ContentIndex setPage={setPage} page={page} />}
        />
        <Route exact path="/coin-details/:id" component={Chart} />
        <Route exact path="/investment" component={Investment} />
        {/* <Route exact path="/faq" component={Faq} /> */}
      </Switch>
    </BrowserRouter>
  );
}
