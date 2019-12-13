import React, { useState } from "react";
import InvestmentPortfolio from "./InvestmentPortfolio";
import RecentSellTransactions from "./RecentSellTransactions";
import InvestmentHistory from "./InvestmentHistory";
import SelectCoin from "./SelectCoin";

export default function Investment() {
  const [selected, setSelected] = useState("");
  const [state, setState] = useState({
    data: []
  });
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        <article className="card car heigt assignment-card cus course-id-1 transacs">
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Your Portfolio</h2>
          </header>
          <section className="card-body price-chart-desc card-section-table">
            <InvestmentPortfolio />
          </section>
          <footer className="card-footer price-chart-foot card-footer-color"></footer>
        </article>
        {/* <div>
          <article className="card assignment-card course-id-2 transac">
            <header className="card-header card-backgrund-color">
              <h2 className="upp">Recent Buy Transactions</h2>
            </header>
            <section className="card-body price-chart-desc card-section-table">
              <RecentSellTransactions />
            </section>
            <footer className="price-chart-foot transac"></footer>
          </article>
          <article className="card assignment-card course-id-4 transac">
            <header className="card-header card-backgrund-color">
              <h2 className="upp">Recent Sell Transactions</h2>
            </header>
            <section className="card-body price-chart-desc card-section-table">
              <RecentSellTransactions />
            </section>
            <footer className="price-chart-foot transac"></footer>
          </article>
        </div> */}
        <article className="card car heigt assignment-card cus course-id-6 transacs">
          <header className="card-header card-backgrund-color">
            <h2 className="upp">History</h2>
          </header>
          <section className="card-body price-chart-desc card-section-table">
            {/* <SelectCoin
              setSelected={setSelected}
              state={state}
              setState={setState}
            /> */}
            <InvestmentHistory
              selected={selected}
              state={state}
              setState={setState}
            />
          </section>
          <footer className="card-footer price-chart-foot card-footer-color"></footer>
        </article>
      </div>
    </div>
  );
}
