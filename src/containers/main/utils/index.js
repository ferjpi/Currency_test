import { formatDate, getColorCode } from "../../../utils";

export const initialMainState = {
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

export const reducer = (state, action) => {
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
