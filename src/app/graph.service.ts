import { AbstractControl } from '@angular/forms';
import { Graph } from './graph.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { controllers } from 'chart.js';

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
    let colors: string[] = [];
    dataFields.forEach((field) => {
      labels.push(field.value.label);
      data.push(field.value.value);
      colors.push(this.hexToRgba(field.value.color, 50));
    });
    const graph: Graph = {
      label: label,
      type: graphType,
      labels: labels,
      data: data,
      colors: colors,
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
      colors: ['#f1f1f1', '#f3f3f3', '#f6f6f6'],
    };
  }

  hexToRgba(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 4), 16);
    let b = parseInt(hex.substr(4, 6), 16);
    let rgba: string = `rgba(${r},${g},${b},${opacity / 100})`;
    return rgba;
  }
}
