import React from "react";
import "./App.css";
import Blob from "./Design/Blob";
import Waves from "./Design/Waves";
import Header from "./components/Header";
import Img from "./Design/Img";
import style from "./style.module.css";

export default function App() {
  return (
    <div className={style.banner}>
      <div className={style.svgGroup}>
        <Blob />
        <Waves />
        <Header />
        <Img />
      </div>
    </div>
  );
}
