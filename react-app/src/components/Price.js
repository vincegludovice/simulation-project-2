import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

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
export default function Chart({ length }) {
  let { id } = useParams();
  const [historicalPrice, setHistoricalPrice] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${length}`
      )
      .then(response => {
        console.log(response.data);
        setHistoricalPrice(
          response.data.prices.map(price => {
            return {
              date:
                length === "1"
                  ? new Date(price[0]).toLocaleTimeString("en-US")
                  : new Date(price[0]).toLocaleDateString("en-US"),
              price: price[1]
            };
          })
        );
      });
  }, [id]);
  return (
    <LineChart
      width={1200}
      height={400}
      data={historicalPrice}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 45
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis type="number" domain={["auto", "auto"]} />
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#532cdd"
        dot={false}
        strokeWidth="2"
      />
    </LineChart>
  );
}
