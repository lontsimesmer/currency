import { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Currency.css";

export default function Currency() {
  // Initialzing the state
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [defaultCurrency, setDefaultCurrency] = useState("usd");
  const [total, setTotal] = useState(0);
  const [wallet, setWallet] = useState([
    { sign: "usd", amount: 100 },
    { sign: "eur", amount: 500 },
    { sign: "xaf", amount: 10000 },
  ]);
  const [rates, setRates] = useState();
  const [deposit, setDeposit] = useState("xaf");
  const [options, setOptions] = useState([]);

  // Fetching data from the Api
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${defaultCurrency}.json`
    )
      .then((res) => res.json())
      .then((res) => {
        setRates(res[defaultCurrency]);
        setOptions([...Object.keys(res[defaultCurrency])]);
      });

    if (rates !== undefined) {
      let tempTotal = 0;

      wallet?.forEach(({ sign, amount }) => {
        tempTotal += (amount / rates[sign]) * rates[defaultCurrency];
        /* console.log(tempTotal); */
      });
      const calculatedTotal =
        (tempTotal / rates[defaultCurrency]) * rates[defaultCurrency];
      setTotal(calculatedTotal);
    }
  }, [defaultCurrency]);

  // Calling the convert function and getting the total in default currency
  function handleConvert() {
    const rate = rates;
    const Results = (input / rate[from]) * rate[to];
    const holder = wallet;

    holder.map((el) => {
      if (el.sign === from) {
        // eslint-disable-next-line
        el.amount -= input;
      } else if (el.sign === to) {
        // eslint-disable-next-line
        el.amount += Results;
      }
      return el;
    });
    setWallet([...holder]);

    if (rates !== undefined) {
      let tempTotal = 0;

      wallet?.forEach(({ sign, amount }) => {
        tempTotal += (amount / rates[sign]) * rates[defaultCurrency];
      });
      const calculatedTotal =
        (tempTotal / rates[defaultCurrency]) * rates[defaultCurrency];
      setTotal(calculatedTotal);
    }
  }

  // Calling the currency deposit and getting the total in default currency
  function handleConfirm() {
    wallet.map((el) => {
      if (el.sign === deposit) {
        // eslint-disable-next-line
        el.amount += input;
      }
      return el;
    });
    setWallet([...wallet]);

    if (rates !== undefined) {
      let tempTotal = 0;

      wallet?.forEach(({ sign, amount }) => {
        tempTotal += (amount / rates[sign]) * rates[defaultCurrency];
      });
      const calculatedTotal =
        (tempTotal / rates[defaultCurrency]) * rates[defaultCurrency];
      setTotal(calculatedTotal);
    }
  }

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
              /* e.target.elements.amount.value = null; */
            }}
          >
            <h2>Converter</h2>
            <div className="input-field">
              <h3>Amount:</h3>
              <input
                id="amount"
                type="number"
                step="any"
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
              e.preventDefault();
              handleConfirm();
            }}
          >
            <h2>Banque</h2>
            <div className="input-field">
              <h3>Amount:</h3>
              <input
                id="amount"
                type="number"
                step="any"
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
            <button type="submit">Confirm</button>
          </form>
          <div className="wallet">
            <h2>My Wallet</h2>
            <div className="select">
              <h3>Default currency:</h3>
              <ReactDropdown
                className="dropdowns"
                options={options}
                value={defaultCurrency.toUpperCase()}
                onChange={(e) => {
                  setDefaultCurrency(e.value);
                }}
              />
            </div>
            <div className="currencies">
              {wallet.map((el, index) => (
                // eslint-disable-next-line
                <p key={index}>
                  {el.sign.toUpperCase()}: {el.amount.toFixed(2)}
                </p>
              ))}
            </div>
            <h4 name="total">Total: {total.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    );
  }
}
