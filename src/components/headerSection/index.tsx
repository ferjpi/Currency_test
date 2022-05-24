import React from "react";
import { SectionStyle, SelectStyle } from "../../assets/styles";
import BarChart from "../barChart";
import { IHeaderProps } from "./model";

function HeaderSection({
  dispatch,
  defaultOptions,
  options,
  chartList,
}: IHeaderProps) {
  return (
    <SectionStyle>
      {defaultOptions.length ? (
        <SelectStyle
          options={options}
          defaultValue={defaultOptions}
          isMulti
          name="currencies"
          data-testid="multi-select"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch({ type: "UPDATE_CHART", payload: e })
          }
        />
      ) : null}

      <BarChart data={chartList} />
    </SectionStyle>
  );
}

export default HeaderSection;
