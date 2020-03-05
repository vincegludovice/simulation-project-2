import React, { useState, useEffect } from "react";
import { Transactions } from "../API/API";
import MaterialTable from "material-table";

export default function RecentSellTransactions() {
  const [state, setState] = useState({
    data: [
      {
        name: "bch",
        coinId: "bitcoin-cash",
        coin: "Bitcoin Cash",
        coinQuantity: 1.2062034013936942,
        price: 200.21,
        totalAmount: "250",
        buy: true,
        timestamp: 1576134371252,
        id: 1
      },
      {
        name: "eth",
        coinId: "ethereum",
        coin: "Ethereum",
        coinQuantity: 17.40437350583603,
        price: 142.22,
        totalAmount: "2500",
        buy: true,
        timestamp: 1576134378605,
        id: 2
      },
      {
        name: "btc",
        coinId: "bitcoin",
        coin: "Bitcoin",
        coinQuantity: 3.455238589790836,
        price: 7163.76,
        totalAmount: "25000",
        buy: true,
        timestamp: 1576134386332,
        id: 3
      },
      {
        name: "ada",
        coinId: "cardano",
        coin: "Cardano",
        coinQuantity: 2722.6070151471654,
        price: 0.03636588,
        totalAmount: "100",
        buy: true,
        timestamp: 1576137480926,
        id: 4
      },
      {
        name: "btc",
        coinId: "bitcoin",
        coin: "Bitcoin",
        coinQuantity: 0.027746367764779404,
        price: 7136.79,
        totalAmount: "200",
        buy: true,
        timestamp: 1576140983474,
        id: 5
      },
      {
        name: "btc",
        coinId: "bitcoin",
        coin: "Bitcoin",
        coinQuantity: 0.02772247841925034,
        price: 7142.94,
        totalAmount: "200",
        buy: true,
        timestamp: 1576143312903,
        id: 6
      }
    ]
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
    Transactions().then(response => {
      var output = state.data.map(val => {
        val.timestamp = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(val.timestamp);
        return val;
      });
      setState({ data: output });
    });
  }, [rowDat]);
  return (
    <MaterialTable
      title=""
      columns={[
        {
          title: "Date",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => (
            <div>
              <p style={{ textTransform: "uppercase" }}>{rowData.timestamp}</p>
            </div>
          )
        },
        {
          title: "Transaction",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => (
            <div>
              <p
                style={{ textTransform: "uppercase" }}
                className={rowData.buy ? "green" : "red"}
              >
                {rowData.buy ? "Buy" : "Sell"}
              </p>
            </div>
          )
        },
        {
          title: "Price Bought (USD)",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          render: rowData => {
            return <p>{(+rowData.price).toFixed(2)}</p>;
          },
          type: "numeric"
        },
        {
          title: "Coin Quantity",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          type: "numeric",
          render: rowData => {
            return <p>{(+rowData.coinQuantity).toFixed(4)}</p>;
          }
        },
        {
          title: "Total Cost (USD)",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          type: "numeric",
          render: rowData => {
            return <p>{(+rowData.totalAmount).toFixed(2)}</p>;
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
