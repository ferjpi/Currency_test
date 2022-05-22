import { useEffect, useReducer } from "react";
import { useFetchGetCurrencies, useFetchGetExchanges } from "../../hooks/query";
import Form from "../currency/form";
import ShowConvertion from "../../components/showConvertion";

const initialMainState = {
  from: "CHF",
  to: "USD",
  amount: 0,
  makeQuery: false,
  currencies: [],
  rawDataCurrency: [],
  rates: {},
  rate: 0,
  convertedAmount: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_CURRENCIES":
      const currencies = Object.keys(payload);
      return { ...state, currencies, rawDataCurrency: payload };
    case "GET_EXCHANGE":
      const { rates } = payload;
      console.log("col: ", rates["COP"]);
      console.log("USD: ", rates["USD"]);
      console.log("CAD: ", rates["CAD"]);

      console.log("CHF: ", rates["CHF"]);
      console.log("EUR: ", rates["EUR"]);
      const r = rates[state.to] / rates[state.from];
      return { ...state, rates, rate: parseFloat(r) };
    case "MAKE_CALCULATION":
      const { from, to, amount } = payload;

      const rate = state.rates[to] / state.rates[from];

      const convertedAmount = amount * rate;
      return { ...state, from, to, amount, rate, convertedAmount };
    default:
      return state;
  }
};

function Main() {
  const [mainState, dispatch] = useReducer(reducer, initialMainState);

  const { isLoading, status, data: rawDataCurrency } = useFetchGetCurrencies();
  const { status: exchangeStatus, data: rawExchanges } = useFetchGetExchanges();

  const formatRate = (rate) => {
    return rate.toFixed(5);
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && status === "success" && rawDataCurrency) {
      dispatch({ type: "LOAD_CURRENCIES", payload: rawDataCurrency });
    }

    if (isSubscribed && exchangeStatus === "success" && rawExchanges) {
      dispatch({ type: "GET_EXCHANGE", payload: rawExchanges });
    }

    return () => (isSubscribed = false);
  }, [rawDataCurrency, isLoading, status, exchangeStatus, rawExchanges]);

  return (
    <main>
      <section>{/* here will go the char */}</section>
      <section>
        <p>Welcome to our convert currency platform</p>
        <div>
          <div>
            <p>Conversion Rate</p>
            <p>{formatRate(mainState.rate)}</p>
          </div>
          <Form submitData={dispatch} currencies={mainState.currencies} />
          {/* <ShowConvertion loading={loading} error={error} data={data} /> */}
          <p>Converted Amount: {mainState.convertedAmount}</p>
        </div>
      </section>
    </main>
  );
}

export default Main;
