import { Router } from '@angular/router';
import { GraphService } from './../graph.service';
import { Subscription } from 'rxjs';
import { GraphConfig } from './../graphConfig.model';
import { ConfigService } from './../config.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit, OnDestroy {
  configForm: FormGroup;
  config: GraphConfig;
  configSub: Subscription;
  constructor(
    private configService: ConfigService,
    private graphService: GraphService,
    private router: Router
  ) {}
  ngOnInit() {
    this.configSub = this.configService.graphConfig.subscribe(
      (config) => (this.config = config)
    );
    this.configForm = new FormGroup({
      opacity: new FormControl(this.config.opacity),
      borderWidth: new FormControl(this.config.borderWidth),
      customColor: new FormControl(this.config.customColor),
      random: new FormControl(this.config.random),
    });
  }

  onConfigSave() {
    let configToSave: GraphConfig = {
      opacity: this.configForm.value.opacity,
      borderWidth: this.configForm.value.borderWidth,
      customColor: this.configForm.value.customColor,
      random: this.configForm.value.random,
    };
    this.configService.saveConfig(configToSave);
    if (this.graphService.currentGraph)
      this.graphService.drawGraphEvent.next(
        this.graphService.currentGraph.type
      );
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    this.configSub.unsubscribe();
  }
}
