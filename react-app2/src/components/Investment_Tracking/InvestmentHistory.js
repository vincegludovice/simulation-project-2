import React, { useEffect } from "react";
import { Transactions } from "../API/API";
import MaterialTable from "material-table";

export default function InvestmentHistory({ selected, state, setState }) {
  useEffect(() => {
    Transactions().then(response => {
      var output = response.data.filter(val => {
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
  }, [selected]);
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
          render: rowData => {
            return (
              <p style={{ textTransform: "uppercase" }}>{rowData.timestamp}</p>
            );
          }
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
        },
        {
          title: "Profit/Loss",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          type: "numeric",
          render: rowData =>
            !rowData.buy ? (
              <p className={rowData.profitOrLoss <= 0 ? "red" : "green"}>
                {Math.round(rowData.profitOrLoss * 10000) / 10000} %
              </p>
            ) : (
              <p>------</p>
            )
        },
        {
          title: "Profit/Loss (USD)",
          headerStyle: {
            height: 10,
            fontWeight: "bold"
          },
          type: "numeric",
          render: rowData =>
            !rowData.buy ? (
              <p className={rowData.profitOrLoss <= 0 ? "red" : "green"}>
                {Math.round(
                  (rowData.profitOrLoss / 100) *
                    rowData.buyPrice *
                    rowData.coinQuantity *
                    10000
                ) / 10000}
              </p>
            ) : (
              <p>------</p>
            )
        }
      ]}
      data={state.data}
      options={{
        search: false
      }}
    />
  );
}
