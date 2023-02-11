import { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Currency.css";

export default function Currency() {
  const [infos, setInfos] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    )
      .then((res) => res.json())
      .then((res) => setOptions([...Object.keys(res[from])]));
  }, [from]);

  function convert() {
    const rate = infos[to];
    setOutput(input * rate);
    console.log(setInfos);
  }

  useEffect(() => {
    setOptions(Object.keys(infos));
    convert();
  }, [infos]);

  if (options.length > 0) {
    return (
      <div className="Currency">
        <h1>Currency Exchange</h1>
        <div className="container">
          <div className="input-field">
            <h3>Amount to convert:</h3>
            <input
              type="text"
              id="amount"
              placeholder="0.00"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="select-options">
            <h4>From</h4>
            <ReactDropdown
              className="dropdown"
              options={options}
              onChange={(e) => {
                setFrom(e.value);
              }}
              value={from.toLocaleUpperCase()}
              placeholder="From"
            />
            <h4>To</h4>
            <ReactDropdown
              className="dropdown"
              options={options}
              onChange={(e) => {
                setTo(e.value);
              }}
              value={to.toUpperCase()}
              placeholder="To"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              convert();
            }}
          >
            Convert
          </button>
        </div>
        <h2>Converted Amount : {output.toFixed(2)}</h2>
      </div>
    );
  }
}
