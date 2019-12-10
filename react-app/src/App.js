import React from "react";
import "./App.css";
import Blob from "./components/Blob";
import Waves from "./components/Waves";
import Header from "./components/Header";
import Img from "./components/Img";

export default function App() {
  return (
    <div className="banner">
      <div className="svg-group bg-gradient">
        <Blob />
        <Waves />
        <Header />
        <Img />
      </div>
    </div>
  );
}
