/* useEffect(() => {
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
}, [wallet, currency]); */
