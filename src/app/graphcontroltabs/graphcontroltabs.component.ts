import { GraphService } from './../graph.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphcontroltabs',
  templateUrl: './graphcontroltabs.component.html',
  styleUrls: ['./graphcontroltabs.component.css'],
})
export class GraphcontroltabsComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  //Triggers the setGraphType function in dataform to check form validation
  setGraphType(type: string) {
    this.graphService.drawGraphEvent.next(type);
  }
  ngOnInit(): void {}
}
