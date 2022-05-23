import { useEffect, useMemo, useReducer } from "react";
import {
  useFetchGetCurrencies,
  useFetchGetHistorical,
} from "../../hooks/query";
import { getColorCode, formatDate } from "../../utils";
import { MainStyle, ContainerStyle } from "../../assets/styles";

import InputRateSection from "../../components/inputRateSection";
import SelectHistoricalSection from "../../components/selectHistoricalSection";
import HeaderSection from "../../components/headerSection";

import "react-datepicker/dist/react-datepicker.css";

const initialMainState = {
  from: "CHF",
  to: "USD",
  amount: 0,
  date: new Date(),
  isDataLoaded: false,
  formattedDate: formatDate(new Date()),
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
    case "LOAD_HISTORICAL":
      const ra = payload.rates[state.to] / payload.rates[state.from];
      const ca = state.chartList.datasets.map((el) => {
        el.data = [payload.rates[el.label]];
        return el;
      });
      state.chartList.datasets = ca;
      const opp = Object.entries(payload.rates).map((el) => ({
        label: el[0],
        value: el[1],
      }));

      return {
        ...state,
        rates: payload.rates,
        rate: parseFloat(ra),
        defaultOptions: [
          {
            label: "CHF",
            value: payload.rates["CHF"],
          },
          {
            label: "USD",
            value: payload.rates["USD"],
          },
        ],
        options: opp,
        isDataLoaded: true,
      };
    case "MAKE_CALCULATION":
      const { from, to, amount } = payload;

      const rate = state.rates[to] / state.rates[from];

      const convertedAmount = amount * rate;
      return { ...state, from, to, amount, rate, convertedAmount };
    case "UPDATE_CHART":
      const datasets = payload.map((el) => {
        return {
          label: el.label,
          data: [el.value],
          backgroundColor: getColorCode(),
        };
      });
      const list = { ...state.chartList };
      list.datasets = datasets;
      return { ...state, chartList: list };
    case "SET_DATE":
      return { ...state, date: payload, formattedDate: formatDate(payload) };
    case "CHANGE_CURRENCY":
      return {
        ...state,
        from: payload.from,
        to: payload.to,
        rate: state.rates[payload.to] / state.rates[payload.from],
      };
    case "CHANGE_CURRENCY_FROM":
      return {
        ...state,
        from: payload,
        rate: state.rates[state.to] / state.rates[payload],
      };
    case "CHANGE_CURRENCY_TO":
      return {
        ...state,
        to: payload,
        rate: state.rates[state.to] / state.rates[payload],
      };
    case "CHANGE_EXCHANGES":
      return {
        ...state,
        to: payload.to,
        from: payload.from,
      };
    case "SET_AMOUNT":
      return {
        ...state,
        amount: payload,
      };
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

  const { status: historicalStatus, data: rawHistorical } =
    useFetchGetHistorical(mainState.formattedDate);

  const defaultOptions = useMemo(() => {
    const defaultOpt = mainState.options.filter(
      (opt) => opt.label === mainState.from || opt.label === mainState.to
    );
    return defaultOpt;
  }, [mainState.options, mainState.from, mainState.to]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && status === "success" && rawDataCurrency) {
      dispatch({ type: "LOAD_CURRENCIES", payload: rawDataCurrency });
    }

    if (isSubscribed && historicalStatus === "success" && rawHistorical) {
      dispatch({ type: "LOAD_HISTORICAL", payload: rawHistorical });
    }

    return () => (isSubscribed = false);
  }, [
    rawDataCurrency,
    isLoadingCurrencies,
    status,
    historicalStatus,
    rawHistorical,
  ]);

  if (!mainState.isDataLoaded) return <p>...is loading</p>;

  return (
    <MainStyle>
      <HeaderSection
        mainState={mainState}
        dispatch={dispatch}
        defaultOptions={defaultOptions}
      />
      <ContainerStyle arial-role="container">
        <InputRateSection mainState={mainState} dispatch={dispatch} />
        <SelectHistoricalSection mainState={mainState} dispatch={dispatch} />
      </ContainerStyle>
    </MainStyle>
  );
}

export default Main;
