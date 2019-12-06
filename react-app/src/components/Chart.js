import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label
} from "recharts";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Price from "./Price";

function CustomizedAxisTick({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
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
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState([]);
  const [marketCap, setmarketCap] = useState([]);
  const [marketExchange, setMarketExchange] = useState([]);
  const [publicInterest, setpublicInterest] = useState([]);
  const [lastUpdate, setLastUpdate] = useState([]);
  const [marketExchangePercent, setMarketExchangePercent] = useState([]);
  const [description, setDescription] = useState([]);
  const [historicalPrice, setHistoricalPrice] = useState([]);
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setCoin(response.data.name);
      setImage(response.data.image.large);
      setDescription(response.data.description.en);
      setPrice(response.data.market_data.current_price.usd);
      // setpublicInterest(response.data.public_interest_score);
      // setLastUpdate(response.data.last_updated);
      // setmarketCap(response.data.market_data.market_cap.usd);
      // setMarketExchange(response.data.market_data.market_cap_change_24h);
      // setMarketExchangePercent(
      //   response.data.market_data.market_cap_change_percentage_24h
      // );
    });
  }, [id]);
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        {/* <div className="w-full md:w-1/2 md:pr-4 pb-16 md:pb-0">
          <h1 className="text-white font-bold text-4xl leading-snug">{coin}</h1>
          <p className="text-white md:mt-10 leading-loose">
            {ReactHtmlParser(description)}
          </p>
        </div> */}
        <article id="card_2" class="card assignment-card course-id-4 cus">
          <header class="card-header card-backgrund-color">
            <h2 class="upp">XRP&nbsp; (xrp)</h2>
          </header>
          <section class="card-body cuts">
            <div class="card-info infot">
              <div class="card-info-element">
                <img
                  src="https://assets.coingecko.com/coins/images/44/large/xrp.png?1564480400"
                  alt="Image"
                />
              </div>
              <div class="card-info-element">
                <div>
                  <div class="card-info-value">Rank:</div>
                  <div class="card-info-description">&nbsp;&nbsp;3</div>
                </div>
                <div>
                  <div class="card-info-value">Current Price:</div>
                  <div class="card-info-description">&nbsp;&nbsp;$0.22</div>
                </div>
                <div>
                  <div class="card-info-value">Circulating Supply:</div>
                  <div class="card-info-description">
                    &nbsp;&nbsp;43,299,885,509
                  </div>
                </div>
                <div>
                  <div class="card-info-value">Market Cap:</div>
                  <div class="card-info-description">
                    &nbsp;&nbsp;$9,722,623,176.00
                  </div>
                </div>
                <div>
                  <div class="card-info-value">All Time High Price:</div>
                  <div class="card-info-description">&nbsp;&nbsp;$3.40</div>
                </div>
              </div>
            </div>
          </section>
        </article>
        <article
          id="card_2"
          class="card assignment-card cus course-id-3 price-chart"
        >
          <header class="card-header card-backgrund-color">
            <h2 class="upp">Historical Chart</h2>
          </header>
          <section class="card-body price-chart-sec">
            <div class="card-info infot">
              <div class="card-info-element price-chart-element">
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
          <footer className="card-footer price-chart-foot"></footer>
        </article>
      </div>
    </div>
  );
}
