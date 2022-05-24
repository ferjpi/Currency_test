import React from "react";
import { SectionStyle, DatePickerStyle } from "../../assets/styles";
import { IHistoricalProps } from "./model";

function SelectHistoricalSection({ dispatch, date }: IHistoricalProps) {
  return (
    <SectionStyle>
      <h2>Search historical rates</h2>
      <p>Select the period that you want to look for</p>
      <DatePickerStyle
        selected={date as Date}
        onChange={(e) => dispatch({ type: "SET_DATE", payload: e })}
        maxDate={new Date()}
        dateFormat="yyyy-MM-dd"
      />
    </SectionStyle>
  );
}

export default SelectHistoricalSection;
