import { useEffect, useReducer } from "react";
import { useFetchGetCurrencies, useFetchGetExchanges } from "../../hooks/query";
import { formatRate } from "../../utils";
import Form from "../currency/form";
import ShowConvertion from "../../components/showConvertion";
import { MainStyle, PreStyle, SectionStyle } from "../../assets/styles";

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
    <MainStyle>
      <SectionStyle>{/* here will go the char */}</SectionStyle>
      <SectionStyle>
        <p>Welcome to our convert currency platform</p>
        <div>
          <p>Converted Amount </p>
          <PreStyle>{mainState.convertedAmount.toFixed(2)}</PreStyle>
          <Form submitData={dispatch} currencies={mainState.currencies} />
          {/* <ShowConvertion loading={loading} error={error} data={data} /> */}
          <div>
            <p>Conversion Rate</p>
            <PreStyle>{formatRate(mainState.rate)}</PreStyle>
          </div>
        </div>
      </SectionStyle>
    </MainStyle>
  );
}

export default Main;
