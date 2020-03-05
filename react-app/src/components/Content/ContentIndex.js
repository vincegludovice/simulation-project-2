import React, { useState, useEffect } from "react";
import axios from "axios";
import Paginate from "../Paginate";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import BuySellModal from "./BuySellModal";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

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
export default function ContentIndex(props) {
  console.log(props);
  const handleBuy = () => {
    if (amount) {
      axios
        .post(`http://localhost:4000/transactions`, {
          name: symbol,
          coinId: coinId,
          coin: coin,
          img: image,
          coinQuantity: amount,
          price: pricetwo,
          totalAmount: rate,
          buy: true,
          timestamp: new Date().getTime()
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: `Succesfully purchased ${coin}`
          });
          setOpen(false);
        })
        .catch(e => {
          Swal.fire({
            icon: "error",
            title: `Unable to Buy ${coin}`,
            text: e.response.data
          });
        });
    } else {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: `Unable to Buy ${coin} - Empty Transaction`
      });
    }
  };
  const gainLoss = (priceSold, current) => {
    return (Number(priceSold) - Number(current)) / Number(current);
  };
  const percentage = num => {
    return (Number(num) - Number(0.01)) * 100;
  };
  const handleSell = () => {
    if (sellCoin) {
      axios
        .post("http://localhost:4000/transactions", {
          name: symbol,
          coinId: coinId,
          coin: coin,
          img: image,
          coinQuantity: sellCoin,
          price: pricetwo,
          totalAmount: totalfee,
          buy: false,
          timestamp: new Date().getTime(),
          profitOrLoss: profitOrLoss,
          buyPrice: buyPrice
        })
        .then(() => {
          setSellAmount(0);
          setSellCoin(0);
          var gainLosss = gainLoss(pricetwo, coinList[coinId]);
          var percentageProfit =
            Number(gainLosss) + Number(percentage(gainLosss));
          var profit =
            Number(totalfee) * (Number(percentageProfit) / Number(100));
          Swal.fire({
            icon: "success",
            title: `You have succesfully sold ${sellCoin} coins of ${coin} at ${pricetwo}.`,
            footer: `<p>Gain/Loss: <span class=${
              profitOrLoss > 0 ? "green" : "red"
            }>${profitOrLoss.toFixed(5)}%</span></p>`
          });
          setOpen(false);
        })
        .catch(e => {
          Swal.fire({
            icon: "error",
            title: `Unable to Buy ${coin}`,
            text: e.response.data
          });
        });
    } else {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: `Unable to Sell ${coin} - Empty Transaction`
      });
    }
  };
  const [buyPrice, setBuyPrice] = useState(0);
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
  const [coin, setCoin] = useState([]);
  const [coinId, setCoinId] = useState([]);
  const [pricetwo, setPricetwo] = useState([]);
  const [rank, setRank] = useState([]);
  const [image, setImage] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [circulatingSupply, setCirculatingSupply] = useState([]);
  const [marketCap, setmarketCap] = useState([]);
  const [ath, setAth] = useState([]);
  const [atl, setAtl] = useState([]);
  const [oneHourChange, setOneHourChange] = useState([]);
  const [twoFourHourChange, setTwoFourHourChange] = useState([]);
  const [sevenDaysChange, setSevenDaysChange] = useState([]);
  const [fourteenDaysChange, setFourteenDaysChange] = useState([]);
  const [thirtyDaysChange, setThirtyDaysChange] = useState([]);
  const [oneYearChange, setOneYearChange] = useState([]);
  const [totalVolume, setTotalVolume] = useState([]);
  const [totalSupply, setTotalSupply] = useState([]);
  const [coinGeckoRank, setCoinGeckoRank] = useState([]);
  const [coinGeckoScore, setCoinGeckoScore] = useState([]);
  const [description, setDescription] = useState([]);
  const [balance, setBalance] = useState();
  const [error, setError] = useState(false);
  const [newBalance, setNewBalance] = useState(false);
  const [sellCoin, setSellCoin] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [currentId, setCurrentId] = useState("");
  let totalfee = +sellCoin * +pricetwo;
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${age}&page=${props.page}&order=${order}`
      )
      .then(response => {
        setData(response.data);
        setListOfCoin(
          response.data.map(data => {
            return data.id;
          })
        );
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
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [listOfCoin, setListOfCoin] = useState([]);
  const [profitOrLoss, setProfitOrLoss] = useState([]);
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
  const handleOpen = datas => {
    setCurrentId(datas.id);
    setOpen(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${datas.id}`)
      .then(response => {
        var coin = response.data;
        setPricetwo(coin.market_data.current_price.usd);
        setCoin(coin.name);
        setCoinId(coin.id);
        setRank(coin.market_cap_rank);
        setSymbol(coin.symbol);
        setImage(coin.image.large);
        setDescription(coin.description.en);
        setCirculatingSupply(coin.market_data.circulating_supply);
        setAth(coin.market_data.ath.usd);
        setAtl(coin.market_data.atl.usd);
        setmarketCap(coin.market_data.market_cap.usd);
        setOneHourChange(
          coin.market_data.price_change_percentage_1h_in_currency.usd
        );
        setTwoFourHourChange(coin.market_data.price_change_percentage_24h);
        setSevenDaysChange(coin.market_data.price_change_percentage_7d);
        setFourteenDaysChange(coin.market_data.price_change_percentage_14d);
        setThirtyDaysChange(coin.market_data.price_change_percentage_30d);
        setOneYearChange(coin.market_data.price_change_percentage_1y);
        setTotalVolume(coin.market_data.total_volume.usd);
        setTotalSupply(coin.market_data.total_supply);
        setCoinGeckoRank(coin.coingecko_rank);
        setCoinGeckoScore(coin.coingecko_score);
      });
  };

  axios
    .get(`http://localhost:4000/transactions`)
    .then(response => {
      let initBalance = 0;
      let fArray = response.data.filter(val => {
        return val.coinId === currentId;
      });
      fArray.forEach(newVal => {
        if (newVal.buy) initBalance += newVal.coinQuantity;
        else initBalance -= newVal.coinQuantity;
      });
      setBalance(initBalance < 0 ? 0 : Number(initBalance).toFixed(5));
      return axios.get(
        `http://localhost:4000/transactions?coinId=${currentId}`
      );
    })
    .then(response => {
      let aCurrentCointPrice = 0;
      let count = 0;
      var stat = true;
      var statChecker = true;
      let array = response.data.reverse();
      array.map((x, i) => {
        if (x.buy && stat) {
          statChecker = false;
          aCurrentCointPrice += x.price;
          count++;
        } else if (!x.buy) {
          if (!statChecker) stat = false;
        }
        return x;
      });
      setProfitOrLoss(
        ((pricetwo - aCurrentCointPrice / count) /
          (aCurrentCointPrice / count)) *
          100
      );
      setBuyPrice(aCurrentCointPrice / count);
    });
  const handleClose = () => {
    setOpen(false);
    setRate(0);
    setAmount(0);
  };
  const [value, setValue] = React.useState(0);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        {/* <BuySellModal {...props} /> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className="container h-full px-4 flex items-center custom">
            <div className="flex flex-wrap items-center flex-custom">
              <article
                style={modalStyle}
                id="card_2"
                className="card assignment-card course-id-4 card-invest"
              >
                <AppBar>
                  <Tabs
                    value={value}
                    onChange={handleChanges}
                    aria-label="simple tabs example"
                    variant="fullWidth"
                  >
                    <Tab
                      label="Buy"
                      style={{ backgroundColor: "#48bb78" }}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Sell"
                      style={{ backgroundColor: "#ed7070" }}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <header></header>
                  <section className="card-body card-inv">
                    <div className="card-info ">
                      <div className="card-info-element">
                        <div className="buySellElement">
                          <img src={image} alt="Image" className="buySellImg" />
                          <div>
                            <div>
                              <div className="card-info-value">
                                Coin Ticker:
                              </div>
                              <div className="card-info-description">
                                &nbsp;&nbsp;{symbol}
                              </div>
                            </div>
                            <div>
                              <div className="card-info-value">
                                Current Price:
                              </div>
                              <div className="card-info-description">
                                &nbsp;&nbsp;{pricetwo}
                                <span>&nbsp;({twoFourHourChange}%)</span>
                              </div>
                            </div>
                            <div>
                              <div className="card-info-value">
                                Coin Quantity On Hand:
                              </div>
                              <div className="card-info-description">
                                &nbsp;&nbsp;{balance}
                              </div>
                            </div>
                          </div>
                        </div>

                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <div className="flex">
                            <div className="h-12 hit placehol">
                              <label
                                className="block buySellText text-gray-700 text-md font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="inline-full-name"
                              >
                                RATE
                              </label>
                            </div>
                            <div className="h-12 hit">
                              <TextField
                                id="outlined-number"
                                type="number"
                                InputLabelProps={{
                                  shrink: true
                                }}
                                variant="outlined"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment
                                      style={{ textTransform: "uppercase" }}
                                      position="start"
                                    >
                                      {symbol}
                                    </InputAdornment>
                                  )
                                }}
                                type="number"
                                value={amount}
                                onChange={e => {
                                  setRate(e.target.value * pricetwo);
                                  setAmount(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex">
                            <div className="h-12 hit placehol">
                              <label
                                className="block buySellText text-gray-700 text-md font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="inline-full-name"
                              >
                                AMOUNT
                              </label>
                            </div>
                            <div className="h-12 hit">
                              <TextField
                                className="numberfield"
                                id="outlined-start-adornment"
                                type="number"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  )
                                }}
                                value={rate}
                                type="number"
                                onChange={e => {
                                  var rates =
                                    e.target.value -
                                    +(
                                      +e.target.value +
                                      -e.target.value * 0.01
                                    ) *
                                      0.01;
                                  setAmount(rates / pricetwo);
                                  setRate(e.target.value);
                                }}
                                variant="outlined"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card-info-element">
                        <div className="flist">
                          <p>
                            Est. Net{" "}
                            <span style={{ textTransform: "uppercase" }}>
                              {symbol}
                            </span>
                            :
                          </p>
                          <span>
                            {formatter.format(
                              +rate - (+rate + -rate * 0.01) * 0.01
                            )}
                          </span>
                        </div>
                        <div className="flist">
                          <p>Transaction Fee: (1%)</p>
                          <span>
                            {formatter.format((+rate + -rate * 0.01) * 0.01)}
                          </span>
                        </div>
                        <div className="flist">
                          <p>Est. Total BTC:</p>
                          <span>{formatter.format(rate)}</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <footer className="card-footer custom-foot foot-modal">
                    <button
                      onClick={handleClose}
                      className="bg-gray-600 hover:bg-gray-600 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBuy}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                    >
                      Buy
                    </button>
                  </footer>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <header className="card-header"></header>
                  <section className="card-body card-inv">
                    <div className="card-info ">
                      <div className="card-info-element">
                        <div className="buySellElement">
                          <img src={image} alt="Image" className="buySellImg" />
                          <div>
                            <div>
                              <div className="card-info-value">
                                Coin Ticker:
                              </div>
                              <div className="card-info-description">
                                &nbsp;&nbsp;{symbol}
                              </div>
                            </div>
                            <div>
                              <div className="card-info-value">
                                Current Price:
                              </div>
                              <div className="card-info-description">
                                &nbsp;&nbsp;{pricetwo}
                                <span>&nbsp;({twoFourHourChange}%)</span>
                              </div>
                            </div>
                            <div>
                              <div className="card-info-value">
                                Coin Quantity On Hand:
                              </div>
                              <div className="card-info-description">
                                &nbsp;&nbsp;{balance}
                              </div>
                            </div>
                          </div>
                        </div>

                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <div className="flex">
                            <div className="h-12 hit placehol">
                              <label
                                className="block buySellText text-gray-700 text-md font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="inline-full-name"
                              >
                                Quantity
                              </label>
                            </div>
                            <div className="h-12 hit">
                              <TextField
                                id="outlined-number"
                                type="number"
                                InputLabelProps={{
                                  shrink: true
                                }}
                                error={error}
                                helperText={error ? "Not Enough Balance" : ""}
                                variant="outlined"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment
                                      style={{ textTransform: "uppercase" }}
                                      position="start"
                                    >
                                      {symbol}
                                    </InputAdornment>
                                  )
                                }}
                                type="number"
                                value={sellCoin}
                                onChange={e => {
                                  console.log(props.price);
                                  if (+e.target.value > +balance) {
                                    setError(true);
                                  } else {
                                    setSellAmount(
                                      props.price * +e.target.value
                                    );
                                    setNewBalance(+balance - +e.target.value);
                                    setError(false);
                                  }
                                  if (e.target.value > -1) {
                                    setSellCoin(+e.target.value);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card-info-element noBack"></div>
                    </div>
                  </section>
                  <footer className="card-footer custom-foot foot-modal">
                    <button
                      onClick={handleClose}
                      className="bg-gray-600 hover:bg-gray-600 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSell}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    >
                      Sell
                    </button>
                  </footer>
                </TabPanel>
              </article>
            </div>
          </div>
        </Modal>

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
                {/* <NavLink to={`/coin-details/${data.id}`}> */}
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                  onClick={e => handleOpen(data)}
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
