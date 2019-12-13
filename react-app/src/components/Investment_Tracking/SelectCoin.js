import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export default function SelectCoin({ setSelected, state, setState }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  useEffect(() => {
    let active = true;
    if (!open) {
      setOptions([]);
    }
    if (!loading) {
      return undefined;
    }
    axios.get("https://api.coingecko.com/api/v3/coins/list").then(response => {
      if (active) {
        setOptions(
          response.data.map(coin => {
            return {
              name: coin.name + " (" + coin.symbol.toUpperCase() + ")"
            };
          })
        );
      }
    });
    return () => {
      active = false;
    };
  }, [loading, open]);
  return (
    <StyledaAutocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      onChange={e => {
        let coinName = e.target.textContent.split("(")[0];
        return (
          () => {
            setSelected(coinName);
            setState(state.data);
          },
          []
        );
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Search"
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}

const StyledaAutocomplete = withStyles({
  root: {
    color: "black",
    borderColor: "black",
    margin: "10px"
  },
  label: {
    textTransform: "capitalize"
  },
  input: {
    color: "black",
    borderColor: "black"
  },
  inputRoot: {
    color: "black",
    borderColor: "black"
  },
  popper: {
    color: "black"
  }
})(Autocomplete);
