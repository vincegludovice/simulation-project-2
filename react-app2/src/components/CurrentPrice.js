import React, { useEffect, useState, useRef } from "react";
import { formatter } from "./Function";

export default function CurrentPrice({ pricetwo }) {
  const [price, setPrice] = useState(0);
  const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");
  pricesWs.onmessage = function(msg) {
    var str = msg.data;
    var pricing = str.match(/\b\d+(?:.\d+)?/);
    var btcdecimal = parseFloat(pricing).toFixed(4);
    if (btcdecimal !== 0) {
      setPrice(btcdecimal);
    }
  };
  return (
    <div>
      <div className="card-info-value">Current Price:</div>
      <div className="card-info-description blue">
        &nbsp;&nbsp;
        {price ? formatter.format(price) : formatter.format(pricetwo)}
      </div>
    </div>
  );
}
