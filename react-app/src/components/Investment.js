import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";

export default function Investment() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Birth Year", field: "birthYear", type: "numeric" },
      {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
      }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34
      }
    ]
  });
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
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(response => {
        console.log(response.data);
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
        setSevenDaysChange(
          response.data.market_data.price_change_percentage_7d
        );
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
      })
      .catch(e => console.log(e));
  }, [id]);
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        <article id="card_2" class="card car assignment-card cus course-id-2">
          <header class="card-header card-backgrund-color">
            <h2 class="upp">Coin Description</h2>
          </header>
          <section class="card-body price-chart-desc">
            <p class="text-black desc-loose">
              Bitcoin is the first successful internet money based on
              peer-to-peer technology; whereby no central bank or authority is
              involved in the transaction and production of the Bitcoin
              currency. It was created by an anonymous individual/group under
              the name, Satoshi Nakamoto. The source code is available publicly
              as an open source project, anybody can look at it and be part of
              the developmental process. Bitcoin is changing the way we see
              money as we speak. The idea was to produce a means of exchange,
              independent of any central authority, that could be transferred
              electronically in a secure, verifiable and immutable way. It is a
              decentralized peer-to-peer internet currency making mobile payment
              easy, very low transaction fees, protects your identity, and it
              works anywhere all the time with no central authority or banks.
              Bitcoin is design to have only 21 million BTC ever created, thus
              making it a deflationary currency. Bitcoin uses the{" "}
              <a href="https://www.coingecko.com/en?hashing_algorithm=SHA-256">
                SHA-256
              </a>{" "}
              hashing algorithm with an average transaction confirmation time of
              10 minutes. Miners today are mining Bitcoin using ASIC chip
              dedicated to only mining Bitcoin, and the hash rate has shot up to
              peta hashes. Being the first successful online cryptography
              currency, Bitcoin has inspired other alternative currencies such
              as{" "}
              <a href="https://www.coingecko.com/en/coins/litecoin">Litecoin</a>
              ,{" "}
              <a href="https://www.coingecko.com/en/coins/peercoin">Peercoin</a>
              ,{" "}
              <a href="https://www.coingecko.com/en/coins/primecoin">
                Primecoin
              </a>
              , and so on. The cryptocurrency then took off with the innovation
              of the turing-complete smart contract by{" "}
              <a href="https://www.coingecko.com/en/coins/ethereum">Ethereum</a>{" "}
              which led to the development of other amazing projects such as{" "}
              <a href="https://www.coingecko.com/en/coins/eos">EOS</a>,{" "}
              <a href="https://www.coingecko.com/en/coins/tron">Tron</a>, and
              even crypto-collectibles such as{" "}
              <a href="https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos">
                CryptoKitties
              </a>
              .
            </p>
          </section>
          <footer class="card-footer price-chart-foot"></footer>
        </article>
        <article
          id="card_2"
          className="card car assignment-card cus course-id-1"
        >
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Your Portfolio</h2>
          </header>
          <section className="card-body price-chart-desc">
            <MaterialTable
              title="Editable Example"
              columns={state.columns}
              data={state.data}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  })
              }}
            />
          </section>
          <footer className="card-footer price-chart-foot"></footer>
        </article>
        <article id="card_2" className="card assignment-card course-id-2">
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Recent Buy Transactions</h2>
          </header>
          <section className="card-body card-inv"></section>
          <footer className="card-footer custom-foot">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
              Buy
            </button>
          </footer>
        </article>
        <article id="card_2" className="card assignment-card course-id-4">
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Recent Sell Transactions</h2>
          </header>
          <section className="card-body card-inv"></section>
          <footer className="card-footer custom-foot">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
              Buy
            </button>
          </footer>
        </article>
        <article
          id="card_2"
          className="card car assignment-card cus course-id-6"
        >
          <header className="card-header card-backgrund-color">
            <h2 className="upp">History</h2>
          </header>
          <section className="card-body price-chart-desc"></section>
          <footer className="card-footer price-chart-foot"></footer>
        </article>
      </div>
    </div>
  );
}
