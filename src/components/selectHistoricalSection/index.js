import React from "react";
import { SectionStyle, DatePickerStyle } from "../../assets/styles";

function SelectHistoricalSection({ dispatch, date }) {
  return (
    <SectionStyle>
      <h2>Search historical rates</h2>
      <p>Select the period that you want to look for</p>
      <DatePickerStyle
        selected={date}
        onChange={(e) => dispatch({ type: "SET_DATE", payload: e })}
        dateFormat="yyyy-MM-dd"
      />
    </SectionStyle>
  );
}

export default SelectHistoricalSection;
