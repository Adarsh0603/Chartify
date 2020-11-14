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
}
