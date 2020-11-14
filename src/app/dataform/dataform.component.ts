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

  constructor(private graphService: GraphService) {}

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
  }

  setGraphType(type: string) {
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
      color: new FormControl('#48C774'),
      value: new FormControl(null, Validators.required),
    });
    (this.dataForm.get('dataFields') as FormArray).push(newDataField);
  }

  deleteField(index: number) {
    (this.dataForm.get('dataFields') as FormArray).removeAt(index);
    if (this.fields.length > 1) this.setGraphType(this.type);
  }
  ngOnDestroy() {
    this.graphSub.unsubscribe();
  }
}
