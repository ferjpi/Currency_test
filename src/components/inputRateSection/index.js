import React from "react";
import { SectionStyle, PreStyle, TitleStyle } from "../../assets/styles";
import Form from "../../containers/currency/form";
import { formatRate } from "../../utils";

function InputRateSection({
  dispatch,
  convertedAmount,
  currencies,
  from,
  to,
  amount,
  rate,
}) {
  return (
    <SectionStyle>
      <TitleStyle>Welcome to our convert currency platform</TitleStyle>
      <div arial-role="Container">
        <p>Converted Amount </p>
        <PreStyle>{convertedAmount.toFixed(2)}</PreStyle>
        <Form
          submitData={dispatch}
          currencies={currencies}
          from={from}
          to={to}
          amount={amount}
        />
        <div>
          <p>Conversion Rate</p>
          <PreStyle>{formatRate(rate)}</PreStyle>
        </div>
      </div>
    </SectionStyle>
  );
}

export default InputRateSection;
