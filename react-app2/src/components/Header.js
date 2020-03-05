import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import Details from "./Details";
import Investment from "./Investment_Tracking/InvestmentIndex";
import ContentIndex from "./Content/ContentIndex";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import walletImg from "../images/wallet.png";
import style from "../style.module.css";
import { Transactions } from "./API/API";

export const circulatingFormat = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default function Waves() {
  const [page, setPage] = React.useState(1);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    Transactions().then(response => {
      let initBalance = 0;
      response.data.forEach(newVal => {
        initBalance = newVal.buy
          ? Number(initBalance) + Number(newVal.totalAmount)
          : Number(initBalance) - Number(newVal.totalAmount);
      });
      setBalance(initBalance);
    });
  });
  return (
    <BrowserRouter>
      <header className="header">
        <div className="container flex justify-between px-4">
          <Card className={style.card}>
            <CardMedia
              className={style.cover}
              title="Live from space album cover"
            >
              <img src={walletImg} alt="Wallet" />
            </CardMedia>
            <div className={style.details}>
              <CardContent className={style.content}>
                <Typography component="h5" variant="h5">
                  {balance < 50 ? 0 : balance.toLocaleString()} USD
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Total Amount Invested
                </Typography>
              </CardContent>
            </div>
          </Card>
          {/* </div> */}
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
        <Route exact path="/coin-details/:id" component={Details} />
        <Route exact path="/investment" component={Investment} />
        {/* <Route exact path="/faq" component={Faq} /> */}
      </Switch>
    </BrowserRouter>
  );
}
