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
    ).then((res) => {
      setInfos(res.data[from]);
    });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(infos));
    /* convert(); */
  }, [infos]);

  function convert() {
    const rate = infos[to];
    setOutput(input * rate);
  }

  return (
    <div className="Currency">
      <h1>Currency Exchange</h1>
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input
            type="text"
            placeholder="Enter the amount"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="middle">
          <h3>From</h3>
          <ReactDropdown
            options={options}
            onChange={(e) => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>

        <div className="right">
          <h3>To</h3>
          <ReactDropdown
            options={options}
            onChange={(e) => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className="result">
        <button
          type="button"
          onClick={() => {
            convert();
          }}
        >
          Convert
        </button>
        <h2>Converted Amount:</h2>
        <p>{input + " " + from + " = " + output.toFixed(3) + " " + to}</p>
      </div>
    </div>
  );
}
