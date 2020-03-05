import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import Price from "./Price";
import { formatter, TabPanel, a11yProps, circulatingFormat } from "./Function";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CurrentPrice from "./CurrentPrice";
import { coinDataRequest } from "./API/API";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const initialState = {
  coin: 0,
  pricetwo: 0,
  rank: 0,
  image: "",
  symbol: "",
  circulatingSupply: 0,
  marketCap: 0,
  ath: 0,
  atl: 0,
  oneHourChange: 0,
  twoFourHourChange: 0,
  sevenDaysChange: 0,
  fourteenDaysChange: 0,
  thirtyDaysChange: 0,
  oneYearChange: 0,
  totalVolume: 0,
  totalSupply: 0,
  coinGeckoRank: 0,
  coinGeckoScore: 0,
  description: ""
};
const seducer = (state, { type, data }) => {
  switch (type) {
    case "onLoad":
      return {
        ...state,
        pricetwo: data.market_data.current_price.usd,
        coin: data.name,
        rank: data.market_cap_rank,
        symbol: data.symbol,
        image: data.image.large,
        description: data.description.en,
        circulatingSupply: data.market_data.circulating_supply,
        ath: data.market_data.ath.usd,
        atl: data.market_data.atl.usd,
        marketCap: data.market_data.market_cap.usd,
        oneHourChange:
          data.market_data.price_change_percentage_1h_in_currency.usd,
        twoFourHourChange: data.market_data.price_change_percentage_24h,
        sevenDaysChange: data.market_data.price_change_percentage_7d,
        fourteenDaysChange: data.market_data.price_change_percentage_14d,
        thirtyDaysChange: data.market_data.price_change_percentage_30d,
        oneYearChange: data.market_data.price_change_percentage_1y,
        totalVolume: data.market_data.total_volume.usd,
        totalSupply: data.market_data.total_supply,
        coinGeckoRank: data.coingecko_rank,
        coinGeckoScore: data.coingecko_score
      };
    default:
      return initialState;
  }
};
export default function Details() {
  const [state, dispatch] = useReducer(seducer, initialState);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { id } = useParams();
  useEffect(() => {
    (async function anyNameFunction() {
      try {
        await coinDataRequest(id).then(response => {
          dispatch({
            type: "onLoad",
            data: response.data
          });
        });
        const t = setInterval(() => {
          coinDataRequest(id).then(response => {
            dispatch({
              type: "onLoad",
              data: response.data
            });
          });
        }, 60000);
        return () => clearInterval(t);
      } catch (e) {}
    })();
  }, []);
  function Change({ text, vari, space }) {
    return (
      <div>
        <div className="card-info-value culor">
          {ReactHtmlParser("&nbsp;&nbsp;")}
          {text}{" "}
        </div>
        <div
          className={`card-info-description culor ${
            vari > 0 ? "green" : "red"
          }`}
        >
          {space ? ReactHtmlParser("&nbsp;&nbsp;") : ""}
          {vari > 0 ? (
            <ExpandLessIcon className="bttom" />
          ) : (
            <ExpandMoreIcon className="bttom" />
          )}
          {`${(Math.round(vari * 100) / 100).toFixed(2)}%`}
          {ReactHtmlParser("&nbsp;&nbsp;")}
        </div>
      </div>
    );
  }
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        <article
          id="card_2"
          className="card car assignment-card course-id-4 cus"
        >
          <header className="card-header card-backgrund-color">
            <h2 className="upp">
              {state.coin}&nbsp; {`(${state.symbol}) Stats`}
            </h2>
          </header>
          <section className="card-body card-body-details elemente-cuts">
            <div className="card-info infot card-info-details ">
              <div className="card-info-element picto">
                <img src={state.image} alt="Image" />
                {/* <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  Buy/Sell
                </button> */}
              </div>
              <div className="card-info-element elemente">
                <div className="card-info-part">
                  <Change text="1h:" vari={state.oneHourChange} space={true} />
                  <Change
                    text="24h:"
                    vari={state.twoFourHourChange}
                    space={false}
                  />
                  <Change
                    text="7d:"
                    vari={state.sevenDaysChange}
                    space={true}
                  />
                  <Change
                    text="14d:"
                    vari={state.fourteenDaysChange}
                    space={false}
                  />
                  <Change
                    text="30d:"
                    vari={state.thirtyDaysChange}
                    space={false}
                  />
                  <Change text="1y:" vari={state.oneYearChange} space={true} />
                </div>
                <div className="card-info-part">
                  <div>
                    <div className="card-info-value">Market Cap Rank:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;{state.rank}
                    </div>
                  </div>
                  <CurrentPrice pricetwo={state.pricetwo} />
                  <div>
                    <div className="card-info-value">Circulating Supply:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;
                      {circulatingFormat(Math.round(state.circulatingSupply))}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Market Cap:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;$
                      {circulatingFormat(Math.round(state.marketCap))}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">All Time High Price:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;{formatter.format(state.ath)}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">All Time Low Price:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;{formatter.format(state.atl)}
                    </div>
                  </div>
                </div>
                <div className="card-info-part">
                  <div>
                    <div className="card-info-value">Trading Volume:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;$
                      {circulatingFormat(Math.round(state.totalVolume))}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Total Supply:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;
                      {state.totalSupply
                        ? circulatingFormat(state.totalSupply)
                        : 0}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Coin Gecko Rank:</div>
                    <div className={`card-info-description ${0 ? "" : ""}`}>
                      &nbsp;&nbsp; {state.coinGeckoRank}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Coin Gecko Score:</div>
                    <div className={`card-info-description ${0 ? "" : ""}`}>
                      &nbsp;&nbsp;
                      {`${(
                        Math.round(state.coinGeckoScore * 100) / 100
                      ).toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="price-chart-foot"></footer>
        </article>
        <article
          id="card_2"
          className="card car assignment-card cus course-id-3 price-chart"
        >
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Historical Chart</h2>
          </header>
          <section className="card-body price-chart-sec">
            <div className="card-info infot">
              <div className="card-info-element price-chart-element">
                <div className={classes.root}>
                  <AppBar
                    position="static"
                    style={{
                      boxShadow: "none",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "white"
                    }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                      style={{ backgroundColor: "white", color: "black" }}
                    >
                      <Tab label="24 Hrs" {...a11yProps(0)} />
                      <Tab label="1 Week" {...a11yProps(1)} />
                      <Tab label="1 Month" {...a11yProps(2)} />
                      <Tab label="6 Months" {...a11yProps(3)} />
                      <Tab label="1 Year" {...a11yProps(4)} />
                      <Tab label="All Time" {...a11yProps(5)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <Price length={"1"} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Price length={"7"} />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Price length={"30"} />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Price length={"180"} />
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <Price length={"365"} />
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <Price length={"max"} />
                  </TabPanel>
                </div>
              </div>
            </div>
          </section>
          <footer className="card-footer price-chart-foot card-footer-color"></footer>
        </article>
        {state.description ? (
          <article
            id="card_2"
            className="card car assignment-card cus course-id-2"
          >
            <header className="card-header card-backgrund-color">
              <h2 className="upp">Coin Description</h2>
            </header>
            <section className="card-body price-chart-desc">
              <p className="text-black desc-loose">
                {ReactHtmlParser(state.description)}
              </p>
            </section>
            <footer className="card-footer price-chart-foot card-footer-color"></footer>
          </article>
        ) : (
          <article></article>
        )}
      </div>
    </div>
  );
}
