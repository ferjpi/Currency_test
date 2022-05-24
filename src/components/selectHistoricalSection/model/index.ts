import { IAction } from "models";

export interface IHistoricalProps {
  dispatch: React.Dispatch<IAction>;
  date: string | Date;
}
