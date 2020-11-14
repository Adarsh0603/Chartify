import { AbstractControl } from '@angular/forms';
import { Graph } from './graph.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor() {}
  generateGraph = new Subject<Graph>();
  label = new Subject<string>();
  type = new Subject<string>();
  types: string[] = ['line', 'bar', 'radar', 'doughnut', 'pie', 'polarArea'];

  setGraph(graphType: string, label: string, dataFields: AbstractControl[]) {
    let data: number[] = [];
    let labels: string[] = [];
    dataFields.forEach((field) => {
      labels.push(field.value.label);
      data.push(field.value.value);
    });
    const graph: Graph = {
      label: label,
      type: graphType,
      labels: labels,
      data: data,
    };
    this.generateGraph.next(graph);
  }

  generateDummy(): Graph {
    let dummyType = this.types[Math.floor(Math.random() * Math.floor(6))];

    return {
      label: 'Dummy Chart',
      type: dummyType,
      labels: ['label1', 'label2', 'label3'],
      data: [44, 54, 34],
    };
  }
}
