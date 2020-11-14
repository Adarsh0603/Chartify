import { Graph } from './../graph.model';
import { GraphService } from './../graph.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { pipe, Subscription } from 'rxjs';
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
    this.drawGraph(this.graphService.generateDummy());

    this.chartSub = this.graphService.generateGraph.subscribe(
      (graph: Graph) => {
        this.drawGraph(graph);
      }
    );
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
            label: '',
            data: graphData.data,
            backgroundColor: graphData.colors,
            borderColor: graphData.borders,
            borderWidth: 0.5,
          },
        ],
      },

      options: {
        legend: {
          display:
            graphData.type == 'line' ||
            graphData.type == 'bar' ||
            graphData.type == 'radar'
              ? false
              : true,
        },
        title: {
          text: graphData.title,
          display: graphData.title ? true : false,
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
    });
  }
  downloadImage() {
    var image = this.graph.nativeElement
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream'); // here is the most important part because if you dont replace you will get a DOM 18 exception.

    console.log(this.chart.toBase64Image());

    var link = document.getElementById('link');
    link.setAttribute('download', `(${this.graphType}).png`);
    link.setAttribute('href', image);
    link.click();
  }

  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }
}
