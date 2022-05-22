import { useEffect, useState } from "react";
import {
  ButtonStyle,
  FormStyle,
  InputNumberStyle,
} from "../../../assets/styles";

const initialFormState = {
  from: "CHF",
  to: "USD",
  amount: 0,
  submit: false,
};

function Form({ submitData, currencies }) {
  const [formState, setFormState] = useState(initialFormState);

  const { from, to, amount, submit } = formState;

  const submitForm = (e) => {
    e.preventDefault();
    //Todo; run validations
    setFormState((prevState) => ({ ...prevState, submit: true }));
  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed && submit) {
      submitData({
        type: "MAKE_CALCULATION",
        payload: { from, to, amount: Number(amount) },
      });
      setFormState((prevState) => ({ ...prevState, submit: false }));
    }

    return () => (isSubscribed = false);
  }, [submit, from, to, amount, submitData]);

  return (
    <FormStyle onSubmit={submitForm}>
      <div>
        <select
          placeholder="from"
          value={from}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              from: e.target.value,
            }))
          }
        >
          {currencies.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
        <select
          type="text"
          placeholder="to"
          value={to}
          onChange={(e) =>
            setFormState((prevState) => ({ ...prevState, to: e.target.value }))
          }
        >
          {currencies.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
      <InputNumberStyle
        type="number"
        placeholder="amount"
        value={amount}
        onChange={(e) =>
          setFormState((prevState) => ({
            ...prevState,
            amount: e.target.value,
          }))
        }
      />
      <ButtonStyle type="submit">Convert</ButtonStyle>
    </FormStyle>
  );
}

export default Form;
