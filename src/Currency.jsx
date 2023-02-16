import { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Currency.css";

export default function Currency() {
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [currency, setCurrency] = useState("usd");
  const [total, setTotal] = useState(0);
  const [wallet, setWallet] = useState({
    usd: { amount: 100 },
    eur: { amount: 500 },
    xaf: { amount: 1000 },
  });
  const [rates, setRates] = useState();
  const [deposit, setDeposit] = useState("usd");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    )
      .then((res) => res.json())
      .then((res) => setOptions([...Object.keys(res[from])]));
  }, [from]);

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => setRates([res[currency]]))
      .then(() => {
        console.log(rates);
        let tempTotal = 0;
        Object.keys(wallet)?.forEach((el) => {
          tempTotal += wallet[el].amount / rates.el;
          console.log(wallet[el].amount, el, rates.el);
        });
        setTotal(tempTotal);
      });
  }, [wallet, currency]);

  if (options.length > 0) {
    return (
      <div className="Currency">
        <h1>CURRENCY EXCHANGE</h1>
        <div className="container">
          <div className="converter">
            <h2>Converter</h2>
            <div className="input-field">
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
                /* convert(); */
              }}
            >
              Convert
            </button>
            {/* <h3>Converted Amount : {output.toFixed(2)}</h3> */}
          </div>
          <div className="deposit">
            <h2>Banque</h2>
            <div className="input-field">
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
                /* confirm(); */
              }}
            >
              Confirm
            </button>
          </div>
          <div className="wallet">
            <h2>My Wallet</h2>
            <div className="select">
              <h3>Default currency:</h3>
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
              {Object.keys(wallet).map((el) => (
                <p key={el}>
                  {el.toUpperCase()}: {wallet[el].amount}
                </p>
              ))}
            </div>
            <h4 name="total">Total: {total}</h4>
          </div>
        </div>
      </div>
    );
  }
}
