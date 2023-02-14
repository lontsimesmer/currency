import { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Currency.css";

export default function Currency() {
  const [infos, setInfos] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [currency, setCurrency] = useState("usd");
  const [deposit, setDeposit] = useState("usd");
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

  function confirm() {}

  useEffect(() => {
    setOptions(Object.keys(infos));
    convert();
    console.log(output);
  }, [infos]);

  if (options.length > 0) {
    return (
      <div className="Currency">
        <h1>CURRENCY EXCHANGE</h1>
        <div className="container">
          <div className="converter">
            <h2>Converter</h2>
            <div className="input1">
              <h3>Amount:</h3>
              <input
                type="text"
                id="amount"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="select-option">
              <h4>From</h4>
              <ReactDropdown
                className="dropdown"
                options={options}
                onChange={(e) => {
                  setFrom(e.value);
                }}
                value={from.toUpperCase()}
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
            {/* <h3>Converted Amount : {output.toFixed(2)}</h3> */}
          </div>
          <div className="deposit">
            <h2>Banque</h2>
            <div className="input2">
              <h3>Amount:</h3>
              <input id="amount" type="text" />
            </div>
            <div className="select-options">
              <h3>Deposit currency:</h3>
              <ReactDropdown
                className="dropdowns"
                options={options}
                onChange={(e) => {
                  setDeposit(e.value);
                }}
                value={deposit.toUpperCase()}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                confirm();
              }}
            >
              Confirm
            </button>
          </div>
          <div className="wallet">
            <h2>My Wallet</h2>
            <div className="select-options">
              <h3>Default currency</h3>
              <ReactDropdown
                className="dropdowns"
                options={options}
                onChange={(e) => {
                  setCurrency(e.value);
                }}
                value={currency.toUpperCase()}
              />
            </div>
            <div className="currencies">
              <p>USD:</p>
              <p>EUR:</p>
              <p>XAF:</p>
              <h4>Total:</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
