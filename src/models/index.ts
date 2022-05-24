export interface IOption {
  label: string;
  value: number;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}
export interface IChartList {
  labels: string[];
  datasets: IDataset[];
}
