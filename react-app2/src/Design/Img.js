import React from "react";
import bitcoin from "./img/undraw_bitcoin2_ave7.svg";
import bit from "./img/undraw_digital_currency_qpak.svg";
import style from "../style.module.css";

export default function Img() {
  return (
    <>
      <img src={bitcoin} className={style.bitcoin} alt="Bitcoin" />
      {/* <img src={bit} className="bit" alt="Bitcoin" /> */}
      <img src={bitcoin} className={style.bitcoin2} alt="Bitcoin" />
    </>
  );
}
