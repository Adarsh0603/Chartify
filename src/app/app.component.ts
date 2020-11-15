import { GraphComponent } from './graph/graph.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('graph') graph: GraphComponent;
  ngOnInit(): void {}
  downloadGraph() {
    this.graph.downloadImage();
  }
}
