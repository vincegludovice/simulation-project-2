import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";

export default function Investment() {
  const [state, setState] = React.useState({
    selectedRow: null,
    data: []
  });
  let coinList = {};
  const [coinLs, setCoinLs] = useState({});
  const [rowDat, setRowDat] = useState([]);
  const percentage = (num, per) => {
    return (num / 100) * per;
  };
  const gainLoss = (priceSold, current) => {
    return (priceSold - current) / current;
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/transactions`)
      .then(response => {
        let buyData = response.data.filter(data => data.buy === true);
        var output = buyData.reduce(function(o, cur) {
          var occurs = o.reduce(function(n, item, i) {
            return item.coinId === cur.coinId ? i : n;
          }, -1);
          if (occurs >= 0) {
            o[occurs].price = +(+o[occurs].price + +cur.price) / 2;
            o[occurs].totalAmount = +o[occurs].totalAmount + +cur.totalAmount;
            o[occurs].coinQuantity =
              +o[occurs].coinQuantity + +cur.coinQuantity;
          } else {
            var obj = {
              ...cur,
              price: parseInt([cur.price]),
              coinQuantity: parseInt([cur.coinQuantity]),
              totalAmount: parseInt([cur.totalAmount])
            };
            o = o.concat([obj]);
          }
          return o;
        }, []);
        let coins = [...output.map(el => el.coinId)].toString();
        const pricesWs = new WebSocket(
          `wss://ws.coincap.io/prices?assets=${coins}`
        );
        pricesWs.onmessage = function(msg) {
          Object.keys(JSON.parse(msg.data)).forEach(e => {
            if (JSON.parse(msg.data)[`${e}`] !== "") {
              coinList[e] = JSON.parse(msg.data)[`${e}`];
            }
            setCoinLs(coinList);
            setState({ ...state, data: output });
          });
        };
      })
      .catch(e => console.log(e.response.data));
  }, [rowDat]);
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
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        <article
          id="card_2"
          className="card car heigt assignment-card cus course-id-1"
        >
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Your Portfolio</h2>
          </header>
          <section className="card-body price-chart-desc card-section-table">
            <MaterialTable
              title=""
              columns={[
                {
                  title: "Coin",
                  render: rowData => (
                    <div>
                      <img
                        src="https://via.placeholder.com/150"
                        style={{ width: 50, borderRadius: "50%" }}
                      />
                      <span>{rowData.coin}</span>
                    </div>
                  )
                },
                {
                  title: "Last Price",
                  type: "numeric",
                  render: rowData => {
                    // if (!rowDat.includes(rowData.coinId))
                    //   setRowDat([...rowDat, rowData.coinId]);
                    return <p>{(+coinLs[rowData.coinId]).toFixed(4)}</p>;
                  }
                },
                {
                  title: "Average Price",
                  type: "numeric",
                  render: rowData => {
                    return <p>{(+rowData.price).toFixed(4)}</p>;
                  }
                },
                {
                  title: "Coin Quantity",
                  type: "numeric",
                  render: rowData => {
                    return <p>{(+rowData.coinQuantity).toFixed(4)}</p>;
                  }
                },
                {
                  title: "Total Cost",
                  type: "numeric",
                  render: rowData => {
                    return <p>{(+rowData.totalAmount).toFixed(2)}</p>;
                  }
                },
                {
                  title: "Market Value",
                  type: "numeric",
                  render: rowData => {
                    var profit =
                      +rowData.totalAmount *
                      (+(
                        parseInt(-1, 10) +
                        (+coinLs[rowData.coinId] - +rowData.price) /
                          +rowData.price
                      ) /
                        100);
                    return <p>{(+rowData.totalAmount - -profit).toFixed(2)}</p>;
                  }
                },
                {
                  title: "Profit",
                  render: rowData => {
                    var gainLoss =
                      +(+coinLs[rowData.coinId] - +rowData.price) /
                      +rowData.price;
                    var onePer = +gainLoss + +0.01;
                    var profit = +rowData.totalAmount * (+onePer / 100);
                    return (
                      <p className={profit > 0 ? "green" : "red"}>
                        {profit.toFixed(2)}
                      </p>
                    );
                  }
                },
                {
                  title: "% Profit",
                  render: rowData => {
                    var gainLosss = gainLoss(
                      coinLs[rowData.coinId],
                      rowData.price
                    );
                    console.log(gainLosss);
                    var onePer = +gainLoss - +0.01;
                    var percentageProfit = +gainLoss + +onePer;
                    return (
                      <p className={percentageProfit > 0 ? "green" : "red"}>
                        {percentageProfit.toFixed(4)}%
                      </p>
                    );
                  }
                }
              ]}
              data={state.data}
              // onRowClick={(evt, selectedRow) =>
              //   setState({ ...state, selectedRow })
              // }
              options={{
                // rowStyle: rowData => ({
                //   backgroundColor:
                //     state.selectedRow &&
                //     state.selectedRow.tableData.id === rowData.tableData.id
                //       ? "#EEE"
                //       : "#FFF"
                // }),
                paging: false
              }}
            />
          </section>
          <footer className="card-footer price-chart-foot card-footer-color"></footer>
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
          className="card car heigt assignment-card cus course-id-6"
        >
          <header className="card-header card-backgrund-color">
            <h2 className="upp">History</h2>
          </header>
          <section className="card-body price-chart-desc card-section-table"></section>
          <footer className="card-footer price-chart-foot card-footer-color"></footer>
        </article>
      </div>
    </div>
  );
}
