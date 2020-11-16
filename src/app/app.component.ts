import { ConfigService } from './config.service';
import { GraphComponent } from './graph/graph.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('graph') graph: GraphComponent;

  constructor(private router: Router, private configService: ConfigService) {}
  isConfig: boolean = false;
  ngOnInit(): void {
    this.configService.getSavedConfig();

    this.router.events.subscribe((event) => {
      this.isConfig = this.router.url == '/' ? false : true;
    });
  }
  downloadGraph() {
    this.graph.downloadImage();
  }
  onAction() {
    this.isConfig = !this.isConfig;
  }
}
