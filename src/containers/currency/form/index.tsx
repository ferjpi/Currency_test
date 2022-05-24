import { IAction } from "../../../models";
import React from "react";
import { useCallback } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import {
  ButtonStyle,
  FormStyle,
  InputNumberStyle,
  GroupSelectStyle,
} from "../../../assets/styles";

interface IFormProps {
  submitData: React.Dispatch<IAction>;
  currencies: string[];
  from: string;
  to: string;
  amount: number;
}

function Form({ submitData, currencies, from, to, amount }: IFormProps) {
  const submitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
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
          placeholder="to"
          value={to}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
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
        data-testid="input-amount"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          submitData({
            type: "SET_AMOUNT",
            payload: parseFloat(e.target.value),
          })
        }
      />
      <ButtonStyle data-testid="submit" type="submit">
        Convert
      </ButtonStyle>
    </FormStyle>
  );
}

export default Form;
