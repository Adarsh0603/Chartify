import { GraphConfig } from './graphConfig.model';
export interface Graph {
  title: string;
  type: string;
  labels: Array<string>;
  data: Array<number>;
  colors: Array<string>;
  borders: Array<string>;
  config: GraphConfig;
}
