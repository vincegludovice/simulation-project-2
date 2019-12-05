import React from "react";
import { Link } from "react-router-dom";
export default function Waves() {
  return (
    <header className="header">
      <div className="container flex justify-between px-4">
        <div></div>
        <ol className="nav">
          <li>
            <Link to="/">Coin Lists</Link>
          </li>
          {/* <li>
            <Link to="/chart">Coin Details</Link>
          </li> */}
          <li>
            <a href="#" target="_blank">
              Investment Tracking
            </a>
          </li>
          {/* <li>
            <a href="#" target="_blank">
              Illustrations
            </a>
          </li> */}
        </ol>
      </div>
    </header>
  );
}
