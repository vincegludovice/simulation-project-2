import React, { Fragment } from "react";
import bitcoin from "./img/undraw_bitcoin2_ave7.svg";
import bit from "./img/undraw_digital_currency_qpak.svg";

export default function Img() {
  return (
    <Fragment>
      <img src={bitcoin} className="bitcoin" alt="Bitcoin" />
      {/* <img src={bit} className="bit" alt="Bitcoin" /> */}
      <img src={bitcoin} className="bitcoin2" alt="Bitcoin" />
    </Fragment>
  );
}
