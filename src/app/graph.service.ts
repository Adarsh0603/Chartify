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
  generateGraph = new Subject<Graph>();
  graphType;
  drawGraphEvent = new Subject<string>();
  types: string[] = ['line', 'bar', 'doughnut', 'pie', 'polarArea'];

  setGraph(graphType: string, title: string, dataFields: AbstractControl[]) {
    let data: number[] = [];
    let labels: string[] = [];
    let colors: string[] = [];
    let borders: string[] = [];
    dataFields.forEach((field) => {
      labels.push(field.value.label);
      data.push(field.value.value);
      colors.push(
        this.hexToRgba(field.value.color, this.configService.config.opacity)
      );
      borders.push(this.hexToRgba(field.value.color, 100));
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
    this.generateGraph.next(graph);
  }

  createGraphMap(graph: Graph) {
    return {
      type: graph.type,
      data: {
        labels: graph.labels,
        datasets: [
          {
            label: '',
            data: graph.data,
            backgroundColor: graph.colors,
            borderColor: graph.borders,
            borderWidth: graph.config.borderWidth / 100,
          },
        ],
      },

      options: {
        legend: {
          display:
            graph.type == 'line' || graph.type == 'bar' || graph.type == 'radar'
              ? false
              : true,
        },
        title: {
          text: graph.title,
          display: graph.title ? true : false,
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

  generateDummy(): Graph {
    let dummyType = this.types[
      Math.floor(Math.random() * Math.floor(this.types.length))
    ];
    let opacity = this.configService.config.opacity / 100;
    return {
      title: 'Dummy Chart',
      type: dummyType,
      labels: ['Label 1', 'Label 2', 'Label 3'],
      data: [44, 54, 34],
      colors: [
        `rgba(255, 99, 132, ${opacity})`,
        `rgba(54, 162, 235, ${opacity})`,
        `rgba(255, 206, 86, ${opacity})`,
      ],
      borders: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235,1)',
        'rgba(255, 206, 86, 1)',
      ],
      config: this.configService.config,
    };
  }

  hexToRgba(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    let rgba: string = `rgba(${r},${g},${b},${opacity / 100})`;
    return rgba;
  }
}
