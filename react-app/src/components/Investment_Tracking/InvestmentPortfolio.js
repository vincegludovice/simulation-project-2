import React, { useState, useEffect } from "react";
import { Transactions } from "../API/API";
import MaterialTable from "material-table";

export default function InvestmentPortfolio() {
  const [state, setState] = useState({
    data: []
  });
  let coinList = {};
  const [coinLs, setCoinLs] = useState({});
  const [rowDat, setRowDat] = useState([]);
  const percentage = num => {
    return (Number(num) - Number(0.01)) * 100;
  };
  const gainLoss = (priceSold, current) => {
    return (Number(priceSold) - Number(current)) / Number(current);
  };
  const add = (num1, num2) => {
    return Number(num1) + Number(num2);
  };
  const minus = (num1, num2) => {
    return Number(num1) - Number(num2);
  };
  const reducer = (objs, willMinus) => {
    return objs.reduce(function(o, cur) {
      var occurs = o.reduce(function(n, item, i) {
        return item.coinId === cur.coinId ? i : n;
      }, -1);
      if (occurs >= 0) {
        if (!willMinus) {
          o[occurs].price = add(o[occurs].price, cur.price) / 2;
          o[occurs].totalAmount = add(o[occurs].totalAmount, cur.totalAmount);
          o[occurs].coinQuantity = add(
            o[occurs].coinQuantity,
            cur.coinQuantity
          );
        } else {
          o[occurs].price = add(o[occurs].price, cur.price) / 2;
          o[occurs].totalAmount = minus(o[occurs].totalAmount, cur.totalAmount);
          o[occurs].coinQuantity = minus(
            o[occurs].coinQuantity,
            cur.coinQuantity
          );
        }
      } else {
        var obj = {
          ...cur,
          price: Number(cur.price),
          coinQuantity: Number(cur.coinQuantity),
          totalAmount: Number(cur.totalAmount)
        };
        o = o.concat([obj]);
      }
      return o;
    }, []);
  };
  useEffect(() => {
    Transactions().then(response => {
      let buyData = response.data.filter(data => data.buy);
      let sellData = response.data.filter(data => !data.buy);
      var output = reducer(buyData, false);
      var outputAfterSell = reducer(sellData, false);
      var all = [...output, ...outputAfterSell];
      var overall = reducer(all, true).filter(data => data.coinQuantity > 0);
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
          setState({ data: overall });
        });
      };
    });
  }, [rowDat]);
  return (
    <MaterialTable
      title=""
      columns={[
        {
          title: "Coin",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => (
            <div>
              <img className="logo" src={rowData.img} alt="Img" />
              <p>{rowData.coin}</p>
            </div>
          )
        },
        {
          title: "Last Price (USD)",
          type: "numeric",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            // if (!rowDat.includes(rowData.coinId))
            //   setRowDat([...rowDat, rowData.coinId]);
            return <p>{(+coinLs[rowData.coinId]).toFixed(4)}</p>;
          }
        },
        {
          title: "Average Price (USD)",
          type: "numeric",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            return <p>{(+rowData.price).toFixed(4)}</p>;
          }
        },
        {
          title: "Coin Quantity",
          type: "numeric",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            return <p>{(+rowData.coinQuantity).toFixed(4)}</p>;
          }
        },
        {
          title: "Total Cost (USD)",
          type: "numeric",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            return <p>{(+rowData.totalAmount).toFixed(2)}</p>;
          }
        },
        {
          title: "Market Value (USD)",
          type: "numeric",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            var gainLosss = gainLoss(coinLs[rowData.coinId], rowData.price);
            var percentageProfit =
              Number(gainLosss) + Number(percentage(gainLosss));
            var profit =
              Number(rowData.totalAmount) *
              (Number(percentageProfit) / Number(100));
            var marketVal = Number(rowData.totalAmount) + Number(profit);
            return <p>{(+marketVal).toFixed(2)}</p>;
          }
        },
        {
          title: "Est. Profit (USD)",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            var gainLosss = gainLoss(coinLs[rowData.coinId], rowData.price);
            var percentageProfit =
              Number(gainLosss) + Number(percentage(gainLosss));
            var profit =
              Number(rowData.totalAmount) *
              (Number(percentageProfit) / Number(100));
            return (
              <p className={profit > 0 ? "green" : "red"}>
                {(+profit).toFixed(2)}
              </p>
            );
          }
        },
        {
          title: "% Profit",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            var gainLosss = gainLoss(coinLs[rowData.coinId], rowData.price);
            var percentageProfit =
              Number(gainLosss) + Number(percentage(gainLosss));
            return (
              <p className={percentageProfit > 0 ? "green" : "red"}>
                {(+percentageProfit).toFixed(4)}%
              </p>
            );
          }
        }
      ]}
      data={state.data}
      options={{
        paging: false,
        search: false
      }}
    />
  );
}
