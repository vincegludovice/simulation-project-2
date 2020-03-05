import React, { useReducer, useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Modal,
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import { formatter, TabPanel, a11yProps } from "../Function";
import Swal from "sweetalert2";
import { coinDataRequest, coinTransactionRequest, buy, sell } from "../API/API";

const initialState = {
  buyPrice: 0,
  data: [],
  age: 10,
  order: "market_cap_desc",
  coin: [],
  coinId: [],
  pricetwo: 0,
  twoFourHourChange: [],
  image: [],
  symbol: [],
  balance: 0,
  error: false,
  sellCoin: 0,
  currentId: "",
  rate: 0,
  amount: 0,
  listOfCoin: [],
  profitOrLoss: 0,
  value: 0,
  sellAmount: 0,
  newBalance: 0
};

const seducer = (
  state,
  { type, data, value, newValue, balance, profitOrLoss, buyPrice }
) => {
  switch (type) {
    case "handleClose":
      return { ...state, rate: 0, amount: 0 };
    case "handleOpen":
      return {
        ...state,
        currentId: data.id,
        pricetwo: data.market_data.current_price.usd,
        coin: data.name,
        coinId: data.id,
        symbol: data.symbol,
        image: data.image.large,
        twoFourHourChange: data.market_data.price_change_percentage_24h,
        balance: balance < 0 ? 0 : Number(balance).toFixed(5),
        profitOrLoss: profitOrLoss,
        buyPrice: buyPrice
      };
    case "handleRateChange":
      return {
        ...state,
        rate: value * state.pricetwo,
        amount: value
      };
    case "handleAmountChange":
      var rates = value - +(+value + -value * 0.01) * 0.01;
      return {
        ...state,
        amount: rates / state.pricetwo,
        rate: value
      };
    case "handleChanges":
      return {
        ...state,
        value: newValue
      };
    case "handleSell":
      return {
        ...state,
        sellCoin: 0
      };
    case "handleChangeQuantity":
      return {
        ...state,
        error: Number(value) > Number(state.balance),
        sellCoin: Number(value) > -1 ? Number(value) : 0,
        newBalance:
          Number(value) < Number(state.balance)
            ? Number(state.balance) - Number(value)
            : 0
      };
    default:
      return initialState;
  }
};

export default function BuySellModal({ open, id, handleClose }) {
  const [state, dispatch] = useReducer(seducer, initialState);
  const [modalStyle] = useState(getModalStyle);
  useEffect(() => {
    (async function anyNameFunction() {
      try {
        let coinData = await coinDataRequest(id);
        let coinBalance = await coinTransactionRequest(id).then(response => {
          let initBalance = 0;
          response.data.forEach(
            newVal =>
              (initBalance += Number(
                newVal.buy ? +newVal.coinQuantity : -newVal.coinQuantity
              ))
          );
          return initBalance;
        });
        let coinGains = coinTransactionRequest(id).then(response => {
          let aCurrentCointPrice = 0;
          let count = 0;
          var stat = true;
          var statChecker = true;
          let array = response.data.reverse();
          array.map(x => {
            if (x.buy && stat) {
              statChecker = false;
              aCurrentCointPrice += Number(x.price);
              count++;
            } else if (!x.buy) {
              if (!statChecker) stat = false;
            }
            return x;
          });
          return [aCurrentCointPrice, count];
        });
        let profitOrLoss = await coinGains.then(res => {
          return (
            ((Number(coinData.data.market_data.current_price.usd) -
              Number(res[0]) / Number(res[1])) /
              (Number(res[0]) / Number(res[1]))) *
            100
          );
        });
        let buyPrice = await coinGains.then(
          res => Number(res[0]) / Number(res[1])
        );
        dispatch({
          type: "handleOpen",
          data: coinData.data,
          balance: coinBalance,
          profitOrLoss: profitOrLoss,
          buyPrice: buyPrice
        });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: `Failed to retrieve data of ${id}`
          // text: e.response.data
        });
      }
    })();
  }, []);

  const onBuy = async () => {
    try {
      if (state.amount) {
        await buy(state)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: `Succesfully purchased ${state.coin}`
            });
            handleClose();
            dispatch({ type: "handleClose" });
          })
          .catch(e => {
            Swal.fire({
              icon: "error",
              title: `Unable to Buy ${state.coin}`,
              text: e.response.data
            });
          });
      } else {
        handleClose();
        dispatch({ type: "handleClose" });
        Swal.fire({
          icon: "error",
          title: `Unable to Buy ${state.coin} - Empty Transaction`
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: `Unable to Buy ${state.coin}`,
        text: e.response.data
      });
    }
  };

  const onSell = async () => {
    try {
      if (state.sellCoin) {
        await sell(state)
          .then(() => {
            dispatch({ type: "handleSell" });
            Swal.fire({
              icon: "success",
              title: `You have succesfully sold ${state.sellCoin} coin(s) of ${state.coin} at ${state.pricetwo}.`,
              footer: `<p>Gain/Loss: <span class=${
                state.profitOrLoss > 0 ? "green" : "red"
              }>${state.profitOrLoss.toFixed(5)}%</span></p>`
            });
            handleClose();
            dispatch({ type: "handleClose" });
          })
          .catch(e => {
            Swal.fire({
              icon: "error",
              title: `Unable to Sell ${state.coin}`
              //   text: e.response.data
            });
          });
      } else {
        handleClose();
        dispatch({ type: "handleClose" });
        Swal.fire({
          icon: "error",
          title: `Unable to Sell ${state.coin} - Empty Transaction`
        });
      }
    } catch (e) {
      handleClose();
      dispatch({ type: "handleClose" });
      Swal.fire({
        icon: "error",
        title: `Unable to Sell ${state.coin}`,
        text: e.response.data
      });
    }
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={() => {
        handleClose();
        dispatch({ type: "handleClose" });
      }}
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
                value={state.value}
                // onChange={handleChanges}
                onChange={(e, newValue) =>
                  dispatch({ type: "handleChanges", newValue: newValue })
                }
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
            <TabPanel value={state.value} index={0}>
              <header></header>
              <section className="card-body card-inv">
                <div className="card-info ">
                  <div className="card-info-element">
                    <div className="buySellElement">
                      <img
                        src={state.image}
                        alt="Image"
                        className="buySellImg"
                      />
                      <div>
                        <div>
                          <div className="card-info-value">Coin Ticker:</div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{state.symbol}
                          </div>
                        </div>
                        <div>
                          <div className="card-info-value">Current Price:</div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{state.pricetwo}
                            <span>&nbsp;({state.twoFourHourChange}%)</span>
                          </div>
                        </div>
                        <div>
                          <div className="card-info-value">
                            Coin Quantity On Hand:
                          </div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{state.balance}
                          </div>
                        </div>
                      </div>
                    </div>

                    <form noValidate autoComplete="off">
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
                                  {state.symbol}
                                </InputAdornment>
                              )
                            }}
                            type="number"
                            value={state.amount}
                            onChange={e =>
                              dispatch({
                                type: "handleRateChange",
                                value: e.target.value
                              })
                            }
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
                            value={state.rate}
                            type="number"
                            onChange={e =>
                              dispatch({
                                type: "handleAmountChange",
                                value: e.target.value
                              })
                            }
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
                          {state.symbol}
                        </span>
                        :
                      </p>
                      <span>
                        {formatter.format(
                          +state.rate -
                            (+state.rate + -state.rate * 0.01) * 0.01
                        )}
                      </span>
                    </div>
                    <div className="flist">
                      <p>Transaction Fee: (1%)</p>
                      <span>
                        {formatter.format(
                          (+state.rate + -state.rate * 0.01) * 0.01
                        )}
                      </span>
                    </div>
                    <div className="flist">
                      <p>Est. Total BTC:</p>
                      <span>{formatter.format(state.rate)}</span>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="card-footer custom-foot foot-modal">
                <button
                  onClick={() => {
                    handleClose();
                    dispatch({ type: "handleClose" });
                  }}
                  className="bg-gray-600 hover:bg-gray-600 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onBuy()}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  Buy
                </button>
              </footer>
            </TabPanel>
            <TabPanel value={state.value} index={1}>
              <header className="card-header"></header>
              <section className="card-body card-inv">
                <div className="card-info ">
                  <div className="card-info-element">
                    <div className="buySellElement">
                      <img
                        src={state.image}
                        alt="Image"
                        className="buySellImg"
                      />
                      <div>
                        <div>
                          <div className="card-info-value">Coin Ticker:</div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{state.symbol}
                          </div>
                        </div>
                        <div>
                          <div className="card-info-value">Current Price:</div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{state.pricetwo}
                            <span>&nbsp;({state.twoFourHourChange}%)</span>
                          </div>
                        </div>
                        <div>
                          <div className="card-info-value">
                            Coin Quantity On Hand:
                          </div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{state.balance}
                          </div>
                        </div>
                      </div>
                    </div>

                    <form noValidate autoComplete="off">
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
                            error={state.error}
                            helperText={state.error ? "Not Enough Balance" : ""}
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  style={{ textTransform: "uppercase" }}
                                  position="start"
                                >
                                  {state.symbol}
                                </InputAdornment>
                              )
                            }}
                            type="number"
                            value={state.sellCoin}
                            onChange={e =>
                              dispatch({
                                type: "handleChangeQuantity",
                                value: e.target.value
                              })
                            }
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
                  onClick={() => {
                    handleClose();
                    dispatch({ type: "handleClose" });
                  }}
                  className="bg-gray-600 hover:bg-gray-600 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onSell()}
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
  );
}

const rand = () => Math.round(Math.random() * 20) - 10;

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
