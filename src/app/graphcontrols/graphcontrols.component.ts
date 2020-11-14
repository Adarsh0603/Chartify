import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-graphcontrols',
  templateUrl: './graphcontrols.component.html',
  styleUrls: ['./graphcontrols.component.css'],
})
export class GraphcontrolsComponent implements OnInit {
  @Output() drawGraph = new EventEmitter<string>();
  constructor() {}

  setGraphType(type: string) {
    this.drawGraph.emit(type);
  }

  ngOnInit(): void {}
}
