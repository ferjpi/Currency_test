import { IChartList, IOption } from "models";

export interface IState {
  from: string;
  to: string;
  amount: number;
  date: string | Date;
  isDataLoaded: boolean;
  formattedDate: string | Date;
  makeQuery: boolean;
  currencies: string[];
  rates: { [r: string]: number };
  rate: number;
  convertedAmount: number;
  options: IOption[];
  defaultOptions: IOption[];
  chartList: IChartList;
}
