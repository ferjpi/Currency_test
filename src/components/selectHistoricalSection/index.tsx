import React from "react";
import { SectionStyle, DatePickerStyle } from "../../assets/styles";
import { IHistoricalProps } from "./model";

function SelectHistoricalSection({ dispatch, date }: IHistoricalProps) {
  return (
    <SectionStyle>
      <h2>Search historical rates</h2>
      <p>Select the period that you want to look for</p>
      <DatePickerStyle
        selected={date}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch({ type: "SET_DATE", payload: e })
        }
        dateFormat="yyyy-MM-dd"
      />
    </SectionStyle>
  );
}

export default SelectHistoricalSection;
