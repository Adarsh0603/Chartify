import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor() {}
  generateGraph = new Subject<string>();
  label = new Subject<string>();
  type = new Subject<string>();

  setGraph(graphType: string) {
    this.generateGraph.next(graphType);
  }
}
