import React from "react";
import { Link } from "react-router-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Chart from "./Chart";
import Investment from "./Investment";
import Content from "./Content";
import Faq from "./Faq";

export default function Waves() {
  const [page, setPage] = React.useState(1);
  return (
    <BrowserRouter>
      <header className="header">
        <div className="container flex justify-between px-4">
          <div></div>
          <ol className="nav">
            <li>
              <Link to="/">Coin Lists</Link>
            </li>
            <li>
              <Link to="/investment">Buy/Sell</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ol>
        </div>
      </header>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Content setPage={setPage} page={page} />}
        />
        <Route exact path="/coin-details/:id" component={Chart} />
        <Route exact path="/investment" component={Investment} />
        <Route exact path="/faq" component={Faq} />
      </Switch>
    </BrowserRouter>
  );
}
