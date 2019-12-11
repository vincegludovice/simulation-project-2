import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Price from "./Price";
import { formatter, circulatingFormat } from "./Content";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CurrentPrice from "./CurrentPrice";

function TabPanel({ children, value, index, ...other }) {
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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));
export default function Chart() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { id } = useParams();
  const [coin, setCoin] = useState([]);
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
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      console.log(response.data);
      setPricetwo(response.data.market_data.current_price.usd);
      setCoin(response.data.name);
      setRank(response.data.market_cap_rank);
      setSymbol(response.data.symbol);
      setImage(response.data.image.large);
      setDescription(response.data.description.en);
      setCirculatingSupply(response.data.market_data.circulating_supply);
      setAth(response.data.market_data.ath.usd);
      setAtl(response.data.market_data.atl.usd);
      setmarketCap(response.data.market_data.market_cap.usd);
      setOneHourChange(
        response.data.market_data.price_change_percentage_1h_in_currency.usd
      );
      setTwoFourHourChange(
        response.data.market_data.price_change_percentage_24h
      );
      setSevenDaysChange(response.data.market_data.price_change_percentage_7d);
      setFourteenDaysChange(
        response.data.market_data.price_change_percentage_14d
      );
      setThirtyDaysChange(
        response.data.market_data.price_change_percentage_30d
      );
      setOneYearChange(response.data.market_data.price_change_percentage_1y);
      setTotalVolume(response.data.market_data.total_volume.usd);
      setTotalSupply(response.data.market_data.total_supply);
      setCoinGeckoRank(response.data.coingecko_rank);
      setCoinGeckoScore(response.data.coingecko_score);
    });
    const t = setInterval(() => {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(response => {
          setPricetwo(response.data.market_data.current_price.usd);
          setCirculatingSupply(response.data.market_data.circulating_supply);
          setAth(response.data.market_data.ath.usd);
          setAtl(response.data.market_data.atl.usd);
          setmarketCap(response.data.market_data.market_cap.usd);
          setOneHourChange(
            response.data.market_data.price_change_percentage_1h_in_currency.usd
          );
          setTwoFourHourChange(
            response.data.market_data.price_change_percentage_24h
          );
          setSevenDaysChange(
            response.data.market_data.price_change_percentage_7d
          );
          setFourteenDaysChange(
            response.data.market_data.price_change_percentage_14d
          );
          setThirtyDaysChange(
            response.data.market_data.price_change_percentage_30d
          );
          setOneYearChange(
            response.data.market_data.price_change_percentage_1y
          );
          setTotalVolume(response.data.market_data.total_volume.usd);
          setTotalSupply(response.data.market_data.total_supply);
        });
    }, 60000);
    return () => clearInterval(t);
  }, [id]);
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
              {coin}&nbsp; {`(${symbol}) Stats`}
            </h2>
          </header>
          <section className="card-body card-body-details elemente-cuts">
            <div className="card-info infot card-info-details ">
              <div className="card-info-element picto">
                <img src={image} alt="Image" />
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  Buy/Sell
                </button>
              </div>
              <div className="card-info-element elemente">
                <div className="card-info-part">
                  <Change text="1h:" vari={oneHourChange} space={true} />
                  <Change text="24h:" vari={twoFourHourChange} space={false} />
                  <Change text="7d:" vari={sevenDaysChange} space={true} />
                  <Change text="14d:" vari={fourteenDaysChange} space={false} />
                  <Change text="30d:" vari={thirtyDaysChange} space={false} />
                  <Change text="1y:" vari={oneYearChange} space={true} />
                </div>
                <div className="card-info-part">
                  <div>
                    <div className="card-info-value">Market Cap Rank:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;{rank}
                    </div>
                  </div>
                  <CurrentPrice pricetwo={pricetwo} />
                  <div>
                    <div className="card-info-value">Circulating Supply:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;
                      {circulatingFormat(Math.round(circulatingSupply))}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Market Cap:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;${circulatingFormat(Math.round(marketCap))}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">All Time High Price:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;{formatter.format(ath)}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">All Time Low Price:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;{formatter.format(atl)}
                    </div>
                  </div>
                </div>
                <div className="card-info-part">
                  <div>
                    <div className="card-info-value">Trading Volume:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;${circulatingFormat(Math.round(totalVolume))}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Total Supply:</div>
                    <div className="card-info-description">
                      &nbsp;&nbsp;
                      {totalSupply ? circulatingFormat(totalSupply) : 0}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Coin Gecko Rank:</div>
                    <div className={`card-info-description ${0 ? "" : ""}`}>
                      &nbsp;&nbsp; {coinGeckoRank}
                    </div>
                  </div>
                  <div>
                    <div className="card-info-value">Coin Gecko Score:</div>
                    <div className={`card-info-description ${0 ? "" : ""}`}>
                      &nbsp;&nbsp;
                      {`${(Math.round(coinGeckoScore * 100) / 100).toFixed(
                        2
                      )}%`}
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
                    <Price
                      length={"1"}
                      formatter={formatter}
                      circulatingFormat={circulatingFormat}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Price
                      length={"7"}
                      formatter={formatter}
                      circulatingFormat={circulatingFormat}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Price
                      length={"30"}
                      formatter={formatter}
                      circulatingFormat={circulatingFormat}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Price
                      length={"180"}
                      formatter={formatter}
                      circulatingFormat={circulatingFormat}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <Price
                      length={"365"}
                      formatter={formatter}
                      circulatingFormat={circulatingFormat}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <Price
                      length={"max"}
                      formatter={formatter}
                      circulatingFormat={circulatingFormat}
                    />
                  </TabPanel>
                </div>
              </div>
            </div>
          </section>
          <footer className="card-footer price-chart-foot"></footer>
        </article>
        {description ? (
          <article
            id="card_2"
            className="card car assignment-card cus course-id-2"
          >
            <header className="card-header card-backgrund-color">
              <h2 className="upp">Coin Description</h2>
            </header>
            <section className="card-body price-chart-desc">
              <p className="text-black desc-loose">
                {ReactHtmlParser(description)}
              </p>
            </section>
            <footer className="card-footer price-chart-foot"></footer>
          </article>
        ) : (
          <article></article>
        )}
      </div>
    </div>
  );
}
