import React from "react";
import { SectionStyle, SelectStyle } from "../../assets/styles";
import BarChart from "../barChart";

function HeaderSection({ mainState, dispatch, defaultOptions }) {
  return (
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
  );
}

export default HeaderSection;
