import { Color } from 'chartjs-plugin-datalabels/types/options';

export interface Graph {
  label: string;
  type: string;
  labels: Array<string>;
  data: Array<number>;
  colors: Array<string>;
}
