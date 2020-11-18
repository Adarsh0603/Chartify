import { GraphConfig } from './../graphConfig.model';
import { ConfigService } from './../config.service';
import { FormdataService } from './../formdata.service';
import { Subscription } from 'rxjs';
import { GraphService } from './../graph.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.css'],
})
export class DataformComponent implements OnInit, OnDestroy {
  dataForm: FormGroup;
  type: string;
  graphSub: Subscription;
  notifyUser: boolean = false;
  errorMessage: string;
  graphConfig: GraphConfig;

  constructor(
    private graphService: GraphService,
    private formDataService: FormdataService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    let currentFormData = this.formDataService.formData;
    this.dataForm = new FormGroup({
      title: new FormControl(currentFormData ? currentFormData.title : ''),
      dataFields: new FormArray(
        currentFormData ? currentFormData.dataFields : []
      ),
    });

    this.graphSub = this.graphService.drawGraphEvent.subscribe(
      (selectedGraphType: string) => {
        this.validateData(selectedGraphType);
      }
    );

    this.configService.graphConfig.subscribe(
      (value) => (this.graphConfig = value)
    );

    if (currentFormData == null)
      for (let i = 0; i < 2; i++) this.addDataField();
  }

  //Triggered by tabs.Passes through here to graphservice after checking form validation.
  validateData(type: string) {
    if (!this.dataForm.valid || this.fields.length == 0) {
      this.showError();
      return;
    }
    this.notifyUser = false;
    this.formDataService.error.next(null);
    this.type = type;
    this.formDataService.setFormData({
      title: this.dataForm.get('title').value,
      dataFields: this.fields,
    });
    this.graphService.setGraph(
      type,
      this.dataForm.get('title').value,
      this.fields
    );
  }

  get fields() {
    return (this.dataForm.get('dataFields') as FormArray).controls;
  }

  addDataField() {
    const newDataField = new FormGroup({
      label: new FormControl(null, Validators.required),
      color: new FormControl(
        !this.graphConfig.random
          ? this.graphConfig.customColor
          : '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      ),
      value: new FormControl(null, Validators.required),
    });
    (this.dataForm.get('dataFields') as FormArray).push(newDataField);
  }

  deleteField(index: number) {
    (this.dataForm.get('dataFields') as FormArray).removeAt(index);
    if (this.fields.length > 0 && this.dataForm.valid && this.type)
      this.validateData(this.type);
  }
  ngOnDestroy() {
    // this.graphSub.unsubscribe();
  }
  showError() {
    this.errorMessage = 'Data fields cannot be empty!';
    if (this.fields.length == 0) {
      this.errorMessage = 'Please add some data.';
    }
    this.formDataService.error.next(this.errorMessage);
  }
}
