import React, { useEffect } from "react";
import axios from "axios";
import Paginate from "./Paginate";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { NavLink } from "react-router-dom";

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
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
export const circulatingFormat = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
export default function Content(props) {
  const [data, setData] = React.useState([]);
  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const handleChange = event => {
    setAge(event.target.value);
  };
  const [order, setOrder] = React.useState("market_cap_desc");
  const handleOrderChange = event => {
    setOrder(event.target.value);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${age}&page=${props.page}&order=${order}`
      )
      .then(response => {
        setData(response.data);
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
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
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
                  {" ("}
                  {data.symbol}
                  {")"}
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
                        &nbsp;&nbsp;{formatter.format(data.market_cap_rank)}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">Current Price:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;{formatter.format(data.current_price)}
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
                        {formatter.format(data.market_cap)}
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
                <NavLink to={`/coin-details/${data.id}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                    Buy/Sell
                  </button>
                </NavLink>
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
