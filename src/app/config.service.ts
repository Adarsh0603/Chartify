import { BehaviorSubject } from 'rxjs';
import { GraphConfig } from './graphConfig.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  graphConfig = new BehaviorSubject<GraphConfig>({
    opacity: 20,
    borderWidth: 50,
    customColor: '#454545',
    random: false,
    dataColor: '#000000',
    dataHide: false,
  });

  get config() {
    let currentConfig: GraphConfig;
    this.graphConfig.subscribe((value) => (currentConfig = value));
    return currentConfig;
  }
  constructor() {}
  getSavedConfig() {
    let savedGraphConfig = JSON.parse(localStorage.getItem('graphConfig'));
    if (savedGraphConfig == null) return;
    this.graphConfig.next(savedGraphConfig);
  }
  saveConfig(newGraphConfig: GraphConfig) {
    localStorage.setItem('graphConfig', JSON.stringify(newGraphConfig));

    this.graphConfig.next(newGraphConfig);
  }
}
