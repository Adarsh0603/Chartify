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
  placeholder: boolean = true;

  @ViewChild('graph') graph: ElementRef;
  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.chartSub = this.graphService.generateGraph.subscribe(() => {
      this.placeholder = false;
      this.drawGraph();
    });
  }
  onRightClick(event: Event) {
    event.preventDefault();
  }

  drawGraph() {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('myChart', this.graphService.createGraphMap());
  }
  downloadImage() {
    let currentGraph = this.graphService.currentGraph;
    var image = this.graph.nativeElement
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream'); // here is the most important part because if you dont replace you will get a DOM 18 exception.

    var link = document.getElementById('link');
    link.setAttribute(
      'download',
      `${currentGraph.title.trim() == '' ? 'untitled' : currentGraph.title}(${
        currentGraph.type
      }).png`
    );
    link.setAttribute('href', image);
    link.click();
  }

  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }
}
