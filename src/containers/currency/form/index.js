import { useEffect, useState } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import {
  ButtonStyle,
  FormStyle,
  InputNumberStyle,
  GroupSelectStyle,
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

  const changeExchanges = () => {
    setFormState((prevState) => ({
      ...prevState,
      from: to,
      to: from,
    }));
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
      <GroupSelectStyle>
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
        <button onClick={changeExchanges}>
          <BsArrowLeftRight />
        </button>
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
      </GroupSelectStyle>
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
