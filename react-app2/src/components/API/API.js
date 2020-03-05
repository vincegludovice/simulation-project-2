import axios from "axios";

export default function API() {}

export function Transactions() {
  return axios
    .get(`http://localhost:4000/transactions`)
    .catch(e => console.log(e.response.data));
}

export function ListOfCoins(age, page, order) {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${age}&page=${page}&order=${order}`
    )
    .catch(e => console.log(e.response.data));
}

export function coinDataRequest(id) {
  return axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .catch(e => console.log(e.response.data));
}

export function coinTransactionRequest(id) {
  return axios
    .get(`http://localhost:4000/transactions?coinId=${id}`)
    .catch(e => console.log(e.response.data));
}

export function buy(state) {
  return axios
    .post(`http://localhost:4000/transactions`, {
      name: state.symbol,
      coinId: state.coinId,
      coin: state.coin,
      img: state.image,
      coinQuantity: state.amount,
      price: state.pricetwo,
      totalAmount: state.rate,
      buy: true,
      timestamp: new Date().getTime()
    })
    .catch(e => console.log(e.response.data));
}

export function sell(state) {
  return axios
    .post("http://localhost:4000/transactions", {
      name: state.symbol,
      coinId: state.coinId,
      coin: state.coin,
      img: state.image,
      coinQuantity: state.sellCoin,
      price: state.pricetwo,
      totalAmount: Number(state.sellCoin) * Number(state.pricetwo),
      buy: false,
      timestamp: new Date().getTime(),
      profitOrLoss: state.profitOrLoss,
      buyPrice: state.buyPrice
    })
    .catch(e => console.log(e.response.data));
}

export function ChartRequest(id, length) {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${length}`
    )
    .catch(e => console.log(e.response.data));
}
