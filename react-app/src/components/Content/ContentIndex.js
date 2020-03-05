import React, { useState, useEffect } from "react";
import Paginate from "../Paginate";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import BuySellModal from "./BuySellModal";
import { formatter, circulatingFormat } from "../Function";
import { ListOfCoins } from "../API/API";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 115
  },
  formControls: {
    margin: theme.spacing(1),
    minWidth: 100
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function ContentIndex(props) {
  const [open, setOpenModal] = useState(false);
  const [id, setId] = useState("");

  const handleOpen = id => {
    setOpenModal(true);
    setId(id);
  };
  const handleClose = () => {
    setOpenModal(false);
    setId("");
  };

  const [data, setData] = useState([]);
  const [age, setAge] = useState(10);
  const [order, setOrder] = useState("market_cap_desc");
  const [listOfCoin, setListOfCoin] = useState([]);
  const classes = useStyles();
  const handleChange = event => {
    setAge(event.target.value);
  };
  const handleOrderChange = event => {
    setOrder(event.target.value);
  };
  useEffect(() => {
    ListOfCoins(age, props.page, order).then(response => {
      setData(response.data);
      setListOfCoin(response.data.map(data => data.id));
    });
  }, [props.page, age, order]);
  const header = [
    "course-id-2",
    "course-id-1",
    "course-id-3",
    "course-id-4",
    "course-id-5",
    "course-id-6",
    "course-id-7"
  ];
  let coinList = {};
  if (listOfCoin) {
    const pricesWs = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${listOfCoin.join(",")}`
    );
    pricesWs.onmessage = function(msg) {
      Object.keys(JSON.parse(msg.data)).forEach(e => {
        if (JSON.parse(msg.data)[`${e}`] !== "") {
          coinList[e] = JSON.parse(msg.data)[`${e}`];
        }
      });
    };
  }
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        {open && <BuySellModal open={open} handleClose={handleClose} id={id} />}
        <article className="card assignment-card top-card">
          <FormControl className={classes.formControls}>
            <InputLabel id="demo-simple-select-label">Order By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={order}
              onChange={handleOrderChange}
            >
              <MenuItem value={"market_cap_desc"}>
                Market Capitalization
              </MenuItem>
              <MenuItem value={"price_desc"}>Price</MenuItem>
              <MenuItem value={"volume_desc"}>Volume</MenuItem>
              <MenuItem value={"gecko_desc"}>CoinGecko Scoring System</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Show Results</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </article>
        {data.map((data, id) => {
          return (
            <article
              id={"card_" + id}
              className={`card assignment-card ${
                header[Math.floor(Math.random() * 6)]
              }`}
            >
              <header className="card-header card-backgrund-color">
                <h2 className="upp">
                  {data.name}
                  &nbsp;
                  {` (${data.symbol})`}
                </h2>
              </header>
              <section className="card-body">
                <div className="card-info infot">
                  <div className="card-info-element">
                    <img src={data.image} alt="Image" />
                  </div>
                  <div className="card-info-element">
                    <div>
                      <div className="card-info-value">Rank:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;{data.market_cap_rank}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">Current Price:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;
                        {coinList[data.id]
                          ? coinList[data.id]
                          : formatter.format(data.current_price)}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">Circulating Supply:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;
                        {circulatingFormat(Math.round(data.circulating_supply))}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">Market Cap:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;
                        {circulatingFormat(Math.round(data.market_cap))}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">
                        All Time High Price:
                      </div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;{formatter.format(data.ath)}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="card-footer custom-foot">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                  onClick={() => handleOpen(data.id)}
                >
                  Buy/Sell
                </button>
                <NavLink to={`/coin-details/${data.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    View Details
                  </button>
                </NavLink>
              </footer>
            </article>
          );
        })}
        <Paginate {...props} age={age} />
      </div>
    </div>
  );
}
