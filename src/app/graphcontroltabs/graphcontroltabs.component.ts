import { GraphService } from './../graph.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-graphcontroltabs',
  templateUrl: './graphcontroltabs.component.html',
  styleUrls: ['./graphcontroltabs.component.css'],
})
export class GraphcontroltabsComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  setGraphType(type: string) {
    this.graphService.drawGraphEvent.next(type);
  }
  ngOnInit(): void {}
}
