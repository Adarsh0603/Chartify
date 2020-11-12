import { GraphService } from './../graph.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import * as Chart from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit, OnDestroy {
  chart: Chart;
  chartSub: Subscription;
  graphType: string;
  @ViewChild('graph') graph: ElementRef;
  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.graphService.generateGraph.subscribe((type) => {
      this.drawGraph(type);
    });
  }

  drawGraph(type: string) {
    if (this.chart) this.chart.destroy();
    this.graphType = type;
    this.chart = new Chart('myChart', {
      type: type,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'custom Chart',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      plugins: [ChartDataLabels],

      options: {
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
    });
  }

  downloadImage() {
    var image = this.graph.nativeElement
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream'); // here is the most important part because if you dont replace you will get a DOM 18 exception.

    var link = document.getElementById('link');
    link.setAttribute('download', `(${this.graphType}).png`);
    link.setAttribute('href', image);
    link.click();
  }

  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }
}
