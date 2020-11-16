import { Subscription } from 'rxjs';
import { GraphConfig } from './../graphConfig.model';
import { ConfigService } from './../config.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit, OnDestroy {
  configForm: FormGroup;
  config: GraphConfig;
  configSub: Subscription;
  constructor(private configService: ConfigService) {}
  ngOnInit() {
    this.configSub = this.configService.graphConfig.subscribe(
      (config) => (this.config = config)
    );
    this.configForm = new FormGroup({
      opacity: new FormControl(this.config.opacity),
      borderWidth: new FormControl(this.config.borderWidth),
    });
  }

  onConfigSave() {
    this.configService.saveConfig(this.configForm.value);
  }
  ngOnDestroy() {
    this.configSub.unsubscribe();
  }
}
