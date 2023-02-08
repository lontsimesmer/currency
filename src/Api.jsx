/* export default function fetchData() {
  return fetch(
    `https://api.exchangeratesapi.io/latest`
  ).then((res) => res.json());
} */

/* useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest`)
      .then((res) => res.json())
      .then((data) => {
        setInfos([data.base, ...Object.keys(data.rates)]);
      });
  }, []); */

/* import { useEffect, useState } from "react";
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
    setOptions(Object.keys[infos]);
    convert();
  }, []);

  function convert() {
    const rate = infos[to];
    setOutput(input * rate);
  }

  function swap() {
    const move = from;
    setFrom(to);
    setTo(move);
  }
  console.log(swap);

  return (
    <div className="Currency">
      <h1>Currency Exchange</h1>
      <div className="Container">
        <div className="Left">
          <h2>Amount</h2>
          <input
            placeholder="Enter an amount"
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="middle">
          <h2>From</h2>
          <select
            placeholder="From"
            options={options}
            onChange={(e) => {
              setFrom(e.value);
            }}
            value={from}
          />
        </div>
        <div className="right">
          <h2>To</h2>
          <select
            placeholder="To"
            options={options}
            onChange={(e) => {
              setTo(e.value);
            }}
            value={to}
          />
        </div>
      </div>
      <div className="Results">
        <button
          onClick={() => {
            convert();
          }}
          type="button"
        >
          Convert
        </button>
        <h3>Converted Amount:</h3>
      </div>
    </div>
  );
}
 */
