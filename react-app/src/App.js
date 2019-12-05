import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Blob from "./components/Blob";
import Waves from "./components/Waves";
import Header from "./components/Header";
import Content from "./components/Content";
import Img from "./components/Img";
import Chart from "./components/Chart";

export default function App(props) {
  const [page, setPage] = React.useState(1);
  return (
    <div className="banner">
      <div className="svg-group bg-gradient">
        <Blob />
        <Waves />
        <BrowserRouter>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Content setPage={setPage} page={page} />}
            />
            <Route exact path="/coin-details/:id" component={Chart} />
          </Switch>
        </BrowserRouter>
        <Img />
      </div>
    </div>
  );
}
