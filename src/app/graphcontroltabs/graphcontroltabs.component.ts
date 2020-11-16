import { Router } from '@angular/router';
import { GraphService } from './../graph.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphcontroltabs',
  templateUrl: './graphcontroltabs.component.html',
  styleUrls: ['./graphcontroltabs.component.css'],
})
export class GraphcontroltabsComponent implements OnInit {
  constructor(private graphService: GraphService, private router: Router) {}

  //Triggers the setGraphType function in dataform to check form validation
  setGraphType(type: string) {
    if (this.router.url == '/config') {
      this.router.navigate(['/']);
    } else this.graphService.drawGraphEvent.next(type);
  }
  ngOnInit(): void {}
}
