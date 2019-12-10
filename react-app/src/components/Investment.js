import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 275
    }
  }
}));
export default function Investment() {
  const classes = useStyles();
  return (
    <div className="container h-full md:pb-40 pt-24 px-4 flex items-center custom">
      <div className="flex flex-wrap md:h-full items-center w-full flex-custom">
        {/* <article
          id="card_2"
          className="card car assignment-card cus course-id-4"
        >
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Coin Description</h2>
          </header>
          <section className="card-body price-chart-desc"></section>
          <footer className="card-footer price-chart-foot"></footer>
        </article> */}
        <article id="card_2" className="card assignment-card course-id-2">
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Buy</h2>
          </header>
          <section className="card-body card-inv">
            <div className="card-info ">
              <div className="card-info-element">
                <div class="flex"></div>
                <form className={classes.root} noValidate autoComplete="off">
                  <div class="flex">
                    <div class="h-12 placehol">
                      <label
                        class="block buySellText text-gray-700 text-md font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        RATE
                      </label>
                    </div>
                    <div class="h-12">
                      <TextField
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="h-12 placehol">
                      <label
                        class="block buySellText text-gray-700 text-md font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        AMOUNT
                      </label>
                    </div>
                    <div class="h-12">
                      <TextField
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-info-element">
                <div className="flist">
                  <p>Est. Net BTC:</p>
                  <span>$0.00</span>
                </div>
                <div className="flist">
                  <p>Est. Fee BTC: (0.15%)</p>
                  <span>$0.00</span>
                </div>
                <div className="flist">
                  <p>Est. Total BTC:</p>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </section>
          <footer className="card-footer custom-foot">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
              Buy
            </button>
          </footer>
        </article>
        <article id="card_2" className="card assignment-card course-id-4">
          <header className="card-header card-backgrund-color">
            <h2 className="upp">Sell</h2>
          </header>
          <section className="card-body card-inv">
            <div className="card-info ">
              <div className="card-info-element">
                <form className={classes.root} noValidate autoComplete="off">
                  <div class="flex">
                    <div class="h-12 placehol">
                      <label
                        class="block buySellText text-gray-700 text-md font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        RATE
                      </label>
                    </div>
                    <div class="h-12">
                      <TextField
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="h-12 placehol">
                      <label
                        class="block buySellText text-gray-700 text-md font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        AMOUNT
                      </label>
                    </div>
                    <div class="h-12">
                      <TextField
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-info-element">
                <div className="flist">
                  <p>Est. Net BTC:</p>
                  <span>$0.00</span>
                </div>
                <div className="flist">
                  <p>Est. Fee BTC: (0.15%)</p>
                  <span>$0.00</span>
                </div>
                <div className="flist">
                  <p>Est. Total BTC:</p>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </section>
          <footer className="card-footer custom-foot">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
              Sell
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
