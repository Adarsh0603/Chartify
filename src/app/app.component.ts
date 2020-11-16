import { Subscription } from 'rxjs';
import { FormdataService } from './formdata.service';
import { ConfigService } from './config.service';
import { GraphComponent } from './graph/graph.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('graph') graph: GraphComponent;
  errorSub: Subscription;
  errorMessage: string;
  notifyUser: boolean;
  constructor(
    private router: Router,
    private configService: ConfigService,
    private formDataService: FormdataService
  ) {}
  isConfig: boolean = false;
  ngOnInit(): void {
    this.configService.getSavedConfig();
    this.errorSub = this.formDataService.error.subscribe((error) => {
      if (error == null) {
        this.notifyUser = false;
        return;
      }
      this.errorMessage = error;
      this.notifyUser = true;
    });
    this.router.events.subscribe(() => {
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
