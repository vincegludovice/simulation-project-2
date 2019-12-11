import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ComposedChart,
  Line,
  Bar,
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
const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
  circulatingFormat
}) => {
  if (active) {
    return (
      <div className="hover-custom-tooltip">
        <p className="time-hover">{`${label}`}</p>
        <p className="price-hover">
          price: {`${payload ? formatter.format(payload[0].value) : ""}`}
        </p>
        <p className="volume-hover">
          volume:{" "}
          {`$${payload ? circulatingFormat(Math.round(payload[1].value)) : ""}`}
        </p>
      </div>
    );
  }

  return null;
};
export default function Chart({ length, formatter, circulatingFormat }) {
  let { id } = useParams();
  const [historicalPrice, setHistoricalPrice] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${length}`
      )
      .then(response => {
        setHistoricalPrice(
          response.data.prices.map((price, i) => {
            return {
              date:
                length === "1"
                  ? new Date(price[0]).toLocaleTimeString("en-US")
                  : new Date(price[0]).toLocaleDateString("en-US"),
              price: price[1],
              volume: response.data.total_volumes[i][1]
            };
          })
        );
      });
  }, [id, length]);
  return (
    <ComposedChart
      width={1235}
      height={545}
      data={historicalPrice}
      margin={{
        top: 30,
        right: 20,
        bottom: 45,
        left: 20
      }}
      padding={0}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis
        type="number"
        dataKey="price"
        domain={["auto", "auto"]}
        padding={{ bottom: 125 }}
      />
      <YAxis
        dataKey="volume"
        yAxisId="left"
        hide={true}
        axisLine={false}
        orientation="right"
        domain={[0, dataMax => dataMax * 4]}
        padding={{ bottom: 0 }}
      />
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} hide={true} />
      <Tooltip
        content={
          <CustomTooltip
            formatter={formatter}
            circulatingFormat={circulatingFormat}
          />
        }
      />
      <Line
        isAnimationActive={true}
        type="monotone"
        dataKey="price"
        stroke="#532cdd"
        dot={false}
        strokeWidth="2"
      />
      <Bar
        dataKey="volume"
        yAxisId="left"
        fill="#413ea0"
        domain={["auto", "auto"]}
      />
    </ComposedChart>
  );
}
