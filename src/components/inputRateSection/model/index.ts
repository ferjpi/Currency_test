import { IAction } from "models";

export interface IRateProps {
  dispatch: React.Dispatch<IAction>;
  convertedAmount: number;
  currencies: string[];
  from: string;
  to: string;
  amount: number;
  rate: number;
}
