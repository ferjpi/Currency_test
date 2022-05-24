import { IAction, IChartList, IOption } from "models";

export interface IHeaderProps {
  dispatch: React.Dispatch<IAction>;
  defaultOptions: IOption[];
  options: IOption[];
  chartList: IChartList;
}
