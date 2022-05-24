import { useQuery } from "react-query";

const APP_ID = process.env.REACT_APP_APP_ID;

export function useFetchGetExchanges() {
  return useQuery("getExchanges", () =>
    fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`
    ).then((res) => res.json())
  );
}

export function useFetchGetCurrencies() {
  return useQuery("getCurrencies", () =>
    fetch(`https://openexchangerates.org/api/currencies.json`).then((res) =>
      res.json()
    )
  );
}

export function useFetchGetHistorical(date) {
  return useQuery(
    ["getHistorical", date],
    () =>
      fetch(
        `https://openexchangerates.org/api/historical/${date}.json?app_id=${APP_ID}`
      ).then((res) => res.json()),
    {
      enabled: !!date,
    }
  );
}
