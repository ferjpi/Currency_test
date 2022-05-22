import { useEffect, useMemo, useReducer } from "react";
import { useFetchGetCurrencies, useFetchGetExchanges } from "../../hooks/query";
import { formatRate, getColorCode } from "../../utils";
import Form from "../currency/form";
import BarChart from "../../components/barChart";
import {
  MainStyle,
  PreStyle,
  SectionStyle,
  SelectStyle,
} from "../../assets/styles";

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
  options: [],
  defaultOptions: [],
  chartList: {
    labels: ["currencies"],
    datasets: [
      {
        label: "CHF",
        data: [0],
        backgroundColor: getColorCode(),
      },
      {
        label: "USD",
        data: [0],
        backgroundColor: getColorCode(),
      },
    ],
  },
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_CURRENCIES":
      const currencies = Object.keys(payload);
      const options = currencies.map((currency) => ({
        value: "0",
        label: currency,
      }));
      const defaultOptions = options.filter(
        (option) => option.value === state.from || option.value === state.to
      );
      return {
        ...state,
        currencies,
        rawDataCurrency: payload,
        options,
        defaultOptions,
      };
    case "GET_EXCHANGE":
      const { rates } = payload;
      const r = rates[state.to] / rates[state.from];
      const c = state.chartList.datasets.map((el) => {
        el.data = [rates[el.label]];
        return el;
      });
      state.chartList.datasets = c;
      const op = Object.entries(rates).map((el) => ({
        label: el[0],
        value: el[1],
      }));
      return {
        ...state,
        rates,
        rate: parseFloat(r),
        defaultOptions: [
          {
            label: "CHF",
            value: rates["CHF"],
          },
          {
            label: "USD",
            value: rates["USD"],
          },
        ],
        options: op,
      };
    case "MAKE_CALCULATION":
      const { from, to, amount } = payload;

      const rate = state.rates[to] / state.rates[from];

      const convertedAmount = amount * rate;
      return { ...state, from, to, amount, rate, convertedAmount };
    case "UPDATE_CHART":
      console.log("apy ", payload);
      const datasets = payload.map((el) => {
        return {
          label: el.label,
          data: [el.value],
          backgroundColor: getColorCode(),
        };
      });
      const list = { ...state.chartList };
      console.log("daaatase ", datasets);
      list.datasets = datasets;
      console.log("list ", list);
      return { ...state, chartList: list };
    default:
      return state;
  }
};

function Main() {
  const [mainState, dispatch] = useReducer(reducer, initialMainState);

  const {
    isLoading: isLoadingCurrencies,
    status,
    data: rawDataCurrency,
  } = useFetchGetCurrencies();
  const {
    isLoading: isLoadingExchanges,
    status: exchangeStatus,
    data: rawExchanges,
  } = useFetchGetExchanges();

  const defaultOptions = useMemo(() => {
    const defaultOpt = mainState.options.filter(
      (opt) => opt.label === mainState.from || opt.label === mainState.to
    );
    return defaultOpt;
  }, [mainState.options, mainState.from, mainState.to]);

  console.log("de ", defaultOptions);
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && status === "success" && rawDataCurrency) {
      dispatch({ type: "LOAD_CURRENCIES", payload: rawDataCurrency });
    }

    if (isSubscribed && exchangeStatus === "success" && rawExchanges) {
      dispatch({ type: "GET_EXCHANGE", payload: rawExchanges });
    }

    return () => (isSubscribed = false);
  }, [
    rawDataCurrency,
    isLoadingCurrencies,
    status,
    exchangeStatus,
    rawExchanges,
  ]);

  if (isLoadingCurrencies || isLoadingExchanges) return <p>...is loading</p>;

  return (
    <MainStyle>
      <SectionStyle>
        {defaultOptions.length ? (
          <SelectStyle
            options={mainState.options}
            defaultValue={defaultOptions}
            isMulti
            name="currencies"
            onChange={(e) => dispatch({ type: "UPDATE_CHART", payload: e })}
          />
        ) : null}

        <BarChart data={mainState.chartList} />
      </SectionStyle>
      <SectionStyle>
        <p>Welcome to our convert currency platform</p>
        <div>
          <p>Converted Amount </p>
          <PreStyle>{mainState.convertedAmount.toFixed(2)}</PreStyle>
          <Form submitData={dispatch} currencies={mainState.currencies} />
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
