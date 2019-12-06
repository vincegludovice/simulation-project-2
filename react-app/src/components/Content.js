import React, { useEffect } from "react";
// import MaterialTable from "material-table";
import axios from "axios";
import Paginate from "./Paginate";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useParams, NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 115
  },
  formControls: {
    margin: theme.spacing(1),
    minWidth: 100
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Content(props) {
  const [data, setData] = React.useState([]);
  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const handleChange = event => {
    setAge(event.target.value);
  };
  const [order, setOrder] = React.useState("market_cap_desc");
  const handleOrderChange = event => {
    setOrder(event.target.value);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${age}&page=${props.page}&order=${order}`
      )
      .then(response => {
        setData(response.data);
      });
  }, [props.page, age, order]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  const circulatingFormat = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const header = [
    "course-id-2",
    "course-id-1",
    "course-id-3",
    "course-id-4",
    "course-id-5",
    "course-id-6",
    "course-id-7"
  ];
  let { id } = useParams();
  const descClick = id => {
    console.log(id);
    // axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(response => {
    //   console.log(response.data.description.en);
    //   console.log(parse(response.data.description.en));
    //   Swal.fire({
    //     title: response.data.name,
    //     text: ReactHtmlParser(response.data.description.en).join(""),
    //     width: 1280
    //   });
    // });
  };
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        <article className="card assignment-card top-card">
          <FormControl className={classes.formControls}>
            <InputLabel id="demo-simple-select-label">Order By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={order}
              onChange={handleOrderChange}
            >
              <MenuItem value={"market_cap_desc"}>
                Market Capitalization
              </MenuItem>
              <MenuItem value={"price_desc"}>Price</MenuItem>
              <MenuItem value={"volume_desc"}>Volume</MenuItem>
              <MenuItem value={"gecko_desc"}>CoinGecko Scoring System</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Show Results</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </article>
        {/* <div className="w-full md:w-1/2 md:pr-4 pb-16 md:pb-0">
          <h1 className="text-white font-bold text-4xl leading-snug">
            Use waves and
            <br />
            blobs to make your
            <br />
            designs more fun
          </h1>

          <p className="text-white md:mt-10 leading-loose">
            Explore unique organic shapes with these tools and
            <br />
            give your design a fresh look.
          </p>
        </div> */}
        {/* <div className="w-full flex marginLeft">
          <div className="card">
            <div className="illustration">
              <MaterialTable
                title="Editable Example"
                columns={[
                  { title: "Cryptocurrencies", field: "name" },
                  {
                    title: "Logo",
                    render: rowData => (
                      <img className="logo" src={rowData.image} alt="Img" />
                    )
                  },
                  { title: "Symbol", field: "symbol" },
                  { title: "Current Price", field: "current_price" }
                ]}
                data={data}
              />
            </div>
          </div>
        </div> */}

        {data.map((data, id) => {
          return (
            <article
              id={"card_" + id}
              className={`card assignment-card ${
                header[Math.floor(Math.random() * 6)]
              }`}
            >
              <header className="card-header card-backgrund-color">
                <h2 className="upp">
                  {data.name}
                  &nbsp;
                  {" ("}
                  {data.symbol}
                  {")"}
                </h2>
              </header>

              <section className="card-body">
                <div className="card-info infot">
                  <div className="card-info-element">
                    <img src={data.image} alt="Image" />
                    {/* <div className="card-info-description">Nummer</div>
        <div className="card-info-value">02</div> */}
                  </div>
                  <div className="card-info-element">
                    <div>
                      <div className="card-info-value">Rank:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;{data.market_cap_rank}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">Current Price:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;{formatter.format(data.current_price)}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">Circulating Supply:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;
                        {circulatingFormat(Math.round(data.circulating_supply))}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">Market Cap:</div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;
                        {formatter.format(data.market_cap)}
                      </div>
                    </div>
                    <div>
                      <div className="card-info-value">
                        All Time High Price:
                      </div>
                      <div className="card-info-description">
                        &nbsp;&nbsp;{formatter.format(data.ath)}
                      </div>
                    </div>
                  </div>

                  {/* <div className="card-info-element">
        <div className="card-info-description">Niveau</div>
        <div className="card-info-value">
          <span className="card-info-assignment-level">C</span>
        </div>
      </div> */}
                </div>
                {/* <p className="card-body-delimiter"></p>
    <p className="card-tags">
      <span className="card-tag card-backgrund-color">Tysk</span>
      <span className="card-tag">STX</span>
      <span className="card-tag">Eksamen</span>
    </p> */}
              </section>
              <footer className="card-footer custom-foot">
                <NavLink to={`/coin-details/${data.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    View Details
                  </button>
                </NavLink>
              </footer>
            </article>
          );
        })}
        {/* <article id="card_2" class="card assignment-card course-id-4 cus">
          <header class="card-header card-backgrund-color">
            <h2 class="upp">XRP&nbsp; (xrp)</h2>
          </header>
          <section class="card-body">
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
        </article> */}
        {/* <article className="card assignment-card course-id-1">
          <header className="card-header card-backgrund-color">
            <h2>Eksamensopgave</h2>
          </header>
          <section className="card-body">
            <div className="card-info">
              <div className="card-info-element">
                <div className="card-info-description">Nummer</div>
                <div className="card-info-value">02</div>
              </div>
              <div className="card-info-element">
                <div className="card-info-description">Minutter</div>
                <div className="card-info-value">5</div>
              </div>
              <div className="card-info-element">
                <div className="card-info-description">Niveau</div>
                <div className="card-info-value">
                  <span className="card-info-assignment-level">B</span>
                </div>
              </div>
            </div>
            <p className="card-body-delimiter"></p>
            <p className="card-tags">
              <span className="card-tag card-backgrund-color">Engelsk</span>
              <span className="card-tag">HF</span>
              <span className="card-tag">Tværgående</span>
            </p>
          </section>
        </article>

        <article className="card assignment-card course-id-4">
          <header className="card-header card-backgrund-color">
            <h2>Eksamensopgave</h2>
          </header>
          <section className="card-body">
            <div className="card-info">
              <div className="card-info-element">
                <div className="card-info-description">Nummer</div>
                <div className="card-info-value">02</div>
              </div>
              <div className="card-info-element">
                <div className="card-info-description">Minutter</div>
                <div className="card-info-value">60</div>
              </div>
              <div className="card-info-element">
                <div className="card-info-description">Niveau</div>
                <div className="card-info-value">
                  <span className="card-info-assignment-level">A</span>
                </div>
              </div>
            </div>
            <p className="card-body-delimiter"></p>
            <p className="card-tags">
              <span className="card-tag card-backgrund-color">Spansk</span>
              <span className="card-tag">HHX</span>
              <span className="card-tag">Eksamen</span>
            </p>
          </section>
        </article>
        <article className="card assignment-card course-id-1">
          <header className="card-header card-backgrund-color">
            <h2>Eksamensopgaver</h2>
          </header>
          <section className="card-body">
            <div className="card-assignment-icon">
              <span className="ml-document-checks"></span>
            </div>
            <div className="card-assignment-text">
              Eksamensopgaverne er opbygget på baggrund af de seneste års
              opgaver til eksamen.
            </div>
          </section>
        </article>

        <article className="card assignment-card course-id-1">
          <header className="card-header card-backgrund-color">
            <h2>Tværgående opgaver</h2>
          </header>
          <section className="card-body">
            <div className="card-assignment-icon">
              <span className="ml-check-cross"></span>
            </div>
            <div className="card-assignment-text">
              Eksamensopgaverne er opbygget på baggrund af de seneste års
              opgaver til eksamen.
            </div>
          </section>
        </article> */}
        <Paginate {...props} age={age} />
      </div>
    </div>
  );
}
