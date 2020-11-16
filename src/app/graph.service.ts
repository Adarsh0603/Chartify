import { ConfigService } from './config.service';
import { AbstractControl } from '@angular/forms';
import { Graph } from './graph.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private configService: ConfigService) {}
  generateGraph = new Subject<boolean>();
  currentGraph: Graph;
  drawGraphEvent = new Subject<string>();
  types: string[] = ['line', 'bar', 'doughnut', 'pie', 'polarArea'];

  setCurrentGraph(graph: Graph) {
    this.currentGraph = graph;
  }

  setGraph(graphType: string, title: string, dataFields: AbstractControl[]) {
    console.log('Called SetGraph');
    let data: number[] = [];
    let labels: string[] = [];
    let colors: string[] = [];
    let borders: string[] = [];
    dataFields.forEach((field) => {
      labels.push(field.value.label);
      data.push(field.value.value);
      colors.push(this.hexToRgba(field.value.color, false));
      borders.push(this.hexToRgba(field.value.color, true));
    });
    const graph: Graph = {
      title: title,
      type: graphType,
      labels: labels,
      data: data,
      colors: colors,
      borders: borders,
      config: this.configService.config,
    };
    this.currentGraph = graph;
    this.generateGraph.next(true);
  }

  createGraphMap() {
    return {
      type: this.currentGraph.type,
      data: {
        labels: this.currentGraph.labels,
        datasets: [
          {
            label: '',
            data: this.currentGraph.data,
            backgroundColor: this.currentGraph.colors,
            borderColor: this.currentGraph.borders,
            borderWidth: this.currentGraph.config.borderWidth / 100,
          },
        ],
      },

      options: {
        legend: {
          display:
            this.currentGraph.type == 'line' ||
            this.currentGraph.type == 'bar' ||
            this.currentGraph.type == 'radar'
              ? false
              : true,
        },
        title: {
          text: this.currentGraph.title,
          display: this.currentGraph.title ? true : false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }

  hexToRgba(hex: string, border: boolean) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    let rgba: string = `rgba(${r},${g},${b},${
      border ? 1 : this.configService.config.opacity / 100
    })`;
    return rgba;
  }
}
