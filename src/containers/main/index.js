import { useEffect, useMemo, useReducer } from "react";
import {
  useFetchGetCurrencies,
  useFetchGetHistorical,
} from "../../hooks/query";
import { MainStyle, ContainerStyle } from "../../assets/styles";
import { reducer, initialMainState } from "./utils";

import InputRateSection from "../../components/inputRateSection";
import SelectHistoricalSection from "../../components/selectHistoricalSection";
import HeaderSection from "../../components/headerSection";

import "react-datepicker/dist/react-datepicker.css";
import EmptyPlaceholder from "../../components/emptyPlaceholder";

function Main() {
  const [mainState, dispatch] = useReducer(reducer, initialMainState);

  const { status: currencyStatus, data: rawDataCurrency } =
    useFetchGetCurrencies();

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
    if (isSubscribed && currencyStatus === "success" && rawDataCurrency) {
      dispatch({ type: "LOAD_CURRENCIES", payload: rawDataCurrency });
    }

    if (isSubscribed && historicalStatus === "success" && rawHistorical) {
      dispatch({ type: "LOAD_HISTORICAL", payload: rawHistorical });
    }

    return () => (isSubscribed = false);
  }, [rawDataCurrency, currencyStatus, historicalStatus, rawHistorical]);

  if (!mainState.isDataLoaded) return <EmptyPlaceholder />;

  return (
    <MainStyle>
      <HeaderSection
        dispatch={dispatch}
        defaultOptions={defaultOptions}
        options={mainState.options}
        chartList={mainState.chartList}
      />
      <ContainerStyle arial-role="container">
        <InputRateSection
          dispatch={dispatch}
          convertedAmount={mainState.convertedAmount}
          currencies={mainState.currencies}
          from={mainState.from}
          to={mainState.to}
          amount={mainState.amount}
          rate={mainState.rate}
        />
        <SelectHistoricalSection dispatch={dispatch} date={mainState.date} />
      </ContainerStyle>
    </MainStyle>
  );
}

export default Main;
