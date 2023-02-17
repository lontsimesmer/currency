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
  const [wallet, setWallet] = useState([
    { sign: "usd", amount: 100 },
    { sign: "eur", amount: 500 },
    { sign: "xaf", amount: 1000 },
  ]);
  const [rates, setRates] = useState();
  const [deposit, setDeposit] = useState("usd");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => {
        setRates(res.usd);
        setOptions([...Object.keys(res[currency])]);
      });
  }, [currency]);

  // useEffect(() => {
  //   fetch(
  //     `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setRates([res[currency]]))
  //     .then(() => {
  //       let usdValue = 0;
  //       let eurValue = 0;
  //       let xafValue = 0;
  //       let getTotal = 0;
  //       Object.keys(wallet)?.forEach((el) => {
  //         usdValue += wallet[el].amount * rates.el;
  //         eurValue += wallet[el].amount * rates.el;
  //         xafValue += wallet[el].amount * rates.el;
  //         getTotal += wallet[el].amount;
  //         /* console.log(wallet[el].amount, el, rates.el); */
  //       });
  //       setWallet(usdValue, eurValue, xafValue);
  //       setTotal(getTotal);
  //     });
  // }, [wallet, currency]);

  function handleConvert() {
    const rate = rates;
    const Results = (input / rate[from]) * rate[to];
    const holder = wallet;
    const newWallet = holder.map((curr) => {
      if (curr.sign === from) {
        curr.amount -= input;
      }
      if (curr.sign === to) {
        return curr;
      }
    });

    newWallet[from].amount -= input;
    newWallet[to].amount += Results;
    setWallet(newWallet);
  }

  // console.log("this wallet", wallet);

  function handleConfirm() {}

  if (options.length > 0) {
    return (
      <div className="Currency">
        <h1>CURRENCY EXCHANGE</h1>
        <div className="container">
          <form
            className="converter"
            onSubmit={(e) => {
              e.preventDefault();
              handleConvert();
            }}
          >
            <h2>Converter</h2>
            <div className="input-field">
              <h3>Amount:</h3>
              <input
                id="amount"
                type="number"
                onChange={(e) => setInput(+e.target.value)}
              />
            </div>

            <div className="select-option">
              <h4>From</h4>
              <ReactDropdown
                className="dropdown"
                options={options}
                value={from.toUpperCase()}
                placeholder="From"
                onChange={(e) => {
                  setFrom(e.value);
                }}
              />
              <h4>To</h4>
              <ReactDropdown
                className="dropdown"
                options={options}
                value={to.toUpperCase()}
                placeholder="To"
                onChange={(e) => {
                  setTo(e.value);
                }}
              />
            </div>
            <button type="submit">Convert</button>
          </form>
          <form
            className="deposit"
            onSubmit={(e) => {
              e.prevenDefault();
              handleConfirm();
            }}
          >
            <h2>Banque</h2>
            <div className="input-field">
              <h3>Amount:</h3>
              <input
                id="amount"
                type="number"
                onChange={(e) => setInput(+e.target.value)}
              />
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
          </form>
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
              {wallet.map((el) => (
                <p key={el}>
                  {el.sign.toUpperCase()}: {el.amount}
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
