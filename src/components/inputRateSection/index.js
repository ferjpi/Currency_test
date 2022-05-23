import React from "react";
import { SectionStyle, PreStyle, TitleStyle } from "../../assets/styles";
import Form from "../../containers/currency/form";
import { formatRate } from "../../utils";

function InputRateSection({ mainState, dispatch }) {
  return (
    <SectionStyle>
      <TitleStyle>Welcome to our convert currency platform</TitleStyle>
      <div aria-roledescription="Container">
        <p>Converted Amount </p>
        <PreStyle>{mainState.convertedAmount.toFixed(2)}</PreStyle>
        <Form
          submitData={dispatch}
          currencies={mainState.currencies}
          from={mainState.from}
          to={mainState.to}
          amount={mainState.amount}
        />
        <div>
          <p>Conversion Rate</p>
          <PreStyle>{formatRate(mainState.rate)}</PreStyle>
        </div>
      </div>
    </SectionStyle>
  );
}

export default InputRateSection;
