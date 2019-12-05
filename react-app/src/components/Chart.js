import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

export default function Chart() {
  let { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState([]);
  const [marketCap, setmarketCap] = useState([]);
  const [marketExchange, setMarketExchange] = useState([]);
  const [publicInterest, setpublicInterest] = useState([]);
  const [lastUpdate, setLastUpdate] = useState([]);
  const [marketExchangePercent, setMarketExchangePercent] = useState([]);
  const [description, setDescription] = useState([]);
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
      setCoin(response.data.name);
      setImage(response.data.image.large);
      setDescription(response.data.description.en);
      setPrice(response.data.market_data.current_price.usd);
      // setpublicInterest(response.data.public_interest_score);
      // setLastUpdate(response.data.last_updated);
      // setmarketCap(response.data.market_data.market_cap.usd);
      // setMarketExchange(response.data.market_data.market_cap_change_24h);
      // setMarketExchangePercent(
      //   response.data.market_data.market_cap_change_percentage_24h
      // );
    });
  }, [id]);
  console.log(coin);
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        <div className="w-full md:w-1/2 md:pr-4 pb-16 md:pb-0">
          <h1 className="text-white font-bold text-4xl leading-snug">{coin}</h1>
          <p className="text-white md:mt-10 leading-loose">
            {ReactHtmlParser(description)}
          </p>
        </div>
        <article id="card_2" class="card assignment-card course-id-4 cus">
          <header class="card-header card-backgrund-color">
            <h2 class="upp">XRP&nbsp; (xrp)</h2>
          </header>
          <section class="card-body cuts">
            <div class="card-info infot">
              <div class="card-info-element">
                <img
                  src="https://assets.coingecko.com/coins/images/44/large/xrp.png?1564480400"
                  alt="Image"
                />
              </div>
              <div class="card-info-element">
                <div>
                  <div class="card-info-value">Rank:</div>
                  <div class="card-info-description">&nbsp;&nbsp;3</div>
                </div>
                <div>
                  <div class="card-info-value">Current Price:</div>
                  <div class="card-info-description">&nbsp;&nbsp;$0.22</div>
                </div>
                <div>
                  <div class="card-info-value">Circulating Supply:</div>
                  <div class="card-info-description">
                    &nbsp;&nbsp;43,299,885,509
                  </div>
                </div>
                <div>
                  <div class="card-info-value">Market Cap:</div>
                  <div class="card-info-description">
                    &nbsp;&nbsp;$9,722,623,176.00
                  </div>
                </div>
                <div>
                  <div class="card-info-value">All Time High Price:</div>
                  <div class="card-info-description">&nbsp;&nbsp;$3.40</div>
                </div>
              </div>
            </div>
          </section>
        </article>
        {/* <div className="w-full flex marginLeft">
          <div className="card">
            <div className="illustration"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
