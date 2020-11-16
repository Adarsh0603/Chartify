import { Subscription } from 'rxjs';
import { GraphService } from './../graph.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private graphService: GraphService, private router: Router) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      title: new FormControl(),
      dataFields: new FormArray([]),
    });
    this.graphSub = this.graphService.drawGraphEvent.subscribe(
      (selectedGraphType: string) => {
        this.setGraphType(selectedGraphType);
      }
    );
    for (let i = 0; i < 4; i++) this.addDataField();
  }

  setGraphType(type: string) {
    if (!this.dataForm.valid || this.fields.length == 0) {
      this.showError();
      return;
    }
    this.notifyUser = false;
    this.type = type;
    this.graphService.setGraph(
      type,
      this.dataForm.get('title').value,
      this.fields
    );
    console.log(this.dataForm);
  }

  get fields() {
    return (this.dataForm.get('dataFields') as FormArray).controls;
  }

  addDataField() {
    const newDataField = new FormGroup({
      label: new FormControl(null, Validators.required),
      color: new FormControl('#ff6384'),
      value: new FormControl(null, Validators.required),
    });
    (this.dataForm.get('dataFields') as FormArray).push(newDataField);
  }

  deleteField(index: number) {
    (this.dataForm.get('dataFields') as FormArray).removeAt(index);
    if (this.fields.length > 0 && this.dataForm.valid)
      this.setGraphType(this.type);
  }
  ngOnDestroy() {
    this.graphSub.unsubscribe();
  }
  showError() {
    this.errorMessage = 'Data fields cannot be empty!';
    if (this.fields.length == 0) {
      this.errorMessage = 'Please add some data.';
    }
    this.notifyUser = true;
  }
}
