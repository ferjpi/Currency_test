import React from "react";
import { SectionStyle, SelectStyle } from "../../assets/styles";
import BarChart from "../barChart";

function HeaderSection({ dispatch, defaultOptions, options, chartList }) {
  return (
    <SectionStyle>
      {defaultOptions.length ? (
        <SelectStyle
          options={options}
          defaultValue={defaultOptions}
          isMulti
          name="currencies"
          onChange={(e) => dispatch({ type: "UPDATE_CHART", payload: e })}
        />
      ) : null}

      <BarChart data={chartList} />
    </SectionStyle>
  );
}

export default HeaderSection;
