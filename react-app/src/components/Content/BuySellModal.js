import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";

export default function BuySellModal({ ...props }) {
  return (
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
            className={classes.paper}
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
                          <div className="card-info-value">Coin Ticker:</div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{symbol}
                          </div>
                        </div>
                        <div>
                          <div className="card-info-value">Current Price:</div>
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
                                +(+e.target.value + -e.target.value * 0.01) *
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
                      <img
                        src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                        alt="Image"
                        className="buySellImg"
                      />
                      <div>
                        <div>
                          <div className="card-info-value">Coin Ticker:</div>
                          <div className="card-info-description">
                            &nbsp;&nbsp;{symbol}
                          </div>
                        </div>
                        <div>
                          <div className="card-info-value">Current Price:</div>
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
                              if (+e.target.value > +balance) {
                                setError(true);
                              } else {
                                setSellAmount(props.price * +e.target.value);
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
  );
}
