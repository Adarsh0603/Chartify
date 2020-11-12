import { GraphService } from './../graph.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.css'],
})
export class DataformComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  ngOnInit(): void {}

  setGraphType(type: string) {
    this.graphService.setGraph(type);
  }
}
