import React, { useEffect, useState, useRef } from "react";
import { formatter } from "./Content";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
export default function CurrentPrice({ pricetwo }) {
  const [price, setPrice] = useState(0);
  const [red, setRed] = useState();
  const prevAmount = usePrevious({ price });
  const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");
  pricesWs.onmessage = function(msg) {
    var str = msg.data;
    var pricing = str.match(/\b\d+(?:.\d+)?/);
    var btcdecimal = parseFloat(pricing).toFixed(4);
    if (btcdecimal !== 0) {
      setPrice(btcdecimal);
    }
    // if (typeof prevAmount !== undefined) {
    //   if (typeof prevAmount.price !== undefined) {
    //     if (prevAmount.price !== price) {
    //       prevAmount.price > pricing ? setRed(true) : setRed(false);
    //     }
    //   } else {
    //   }
    // }
  };
  return (
    <div>
      <div className="card-info-value">Current Price:</div>
      <div className={`card-info-description ${red ? "blue" : "blue"}`}>
        &nbsp;&nbsp;{" "}
        {price ? formatter.format(price) : formatter.format(pricetwo)}
      </div>
    </div>
  );
}
