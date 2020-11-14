import { Graph } from './../graph.model';
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
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit, OnDestroy {
  chart: Chart = null;
  chartSub: Subscription;
  graphType: string;
  @ViewChild('graph') graph: ElementRef;
  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.graphService.generateGraph.subscribe((graph: Graph) => {
      this.drawGraph(graph);
    });
  }
  onRightClick(event: Event) {
    event.preventDefault();
  }

  drawGraph(graphData: Graph) {
    if (this.chart) this.chart.destroy();
    this.graphType = graphData.type;
    this.chart = new Chart('myChart', {
      type: graphData.type,
      data: {
        labels: graphData.labels,
        datasets: [
          {
            label: graphData.label,
            data: graphData.data,
            /* backgroundColor: [
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
            borderWidth: 0.5, */
          },
        ],
      },

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
