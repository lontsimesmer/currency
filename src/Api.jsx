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

/* const newWallet = holder?.forEach((el) => {
  if (el.sign === from) {
    const negative = el.amount - input;
    setWallet(wallet(negative[0]));
    console.log("new amount", negative);
  }
  if (el.sign === to) {
    el.amount += Results;
  }
  return el;
});

newWallet[from].amount -= input;
newWallet[to].amount += Results;
setWallet(newWallet);
console.log(wallet);
setTotal(Results); */

/* const handleTotal = (dol) => {
    console.log("this dol", dol);
    const holder = wallet;
    let tempTotal = 0;
    const newHolder = holder.map((curr) => {
      if (curr.sign === "USD") {
        tempTotal += curr.amount;
        return curr;
      }
      console.log("map entered", curr.sign);
      tempTotal += (curr.amount / rates[curr.sign]) * rates.usd;
      return curr;
    });
    setTotal((tempTotal / rates.usd) * rates[dol]);
    console.log("this newHolder", newHolder, total);
  }; */
