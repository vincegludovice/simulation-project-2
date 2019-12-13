import axios from "axios";

export default function API() {}

export function Transactions() {
  return axios
    .get(`http://localhost:4000/transactions`)
    .catch(e => console.log(e.response.data));
}
