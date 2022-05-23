import { useCallback } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import {
  ButtonStyle,
  FormStyle,
  InputNumberStyle,
  GroupSelectStyle,
} from "../../../assets/styles";

function Form({ submitData, currencies, from, to, amount }) {
  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      submitData({
        type: "MAKE_CALCULATION",
        payload: { from, to, amount: Number(amount) },
      });
    },
    [from, to, amount, submitData]
  );

  const changeExchanges = useCallback(() => {
    submitData({
      type: "CHANGE_EXCHANGES",
      payload: {
        to,
        from,
      },
    });
  }, [to, from, submitData]);

  return (
    <FormStyle onSubmit={submitForm}>
      <GroupSelectStyle>
        <select
          placeholder="from"
          value={from}
          onChange={(e) =>
            submitData({
              type: "CHANGE_CURRENCY_FROM",
              payload: e.target.value,
            })
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
            submitData({
              type: "CHANGE_CURRENCY_TO",
              payload: e.target.value,
            })
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
          submitData({
            type: "SET_AMOUNT",
            payload: e.target.value,
          })
        }
      />
      <ButtonStyle type="submit">Convert</ButtonStyle>
    </FormStyle>
  );
}

export default Form;
