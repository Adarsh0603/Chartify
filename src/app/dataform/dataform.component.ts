import { GraphService } from './../graph.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.css'],
})
export class DataformComponent implements OnInit {
  dataForm: FormGroup;

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      label: new FormControl(),
      dataFields: new FormArray([]),
    });
  }

  setGraphType(type: string) {
    this.graphService.setGraph(
      type,
      this.dataForm.get('label').value,
      (this.dataForm.get('dataFields') as FormArray).controls
    );
  }

  get fields() {
    return (this.dataForm.get('dataFields') as FormArray).controls;
  }
  addDataField() {
    const newDataField = new FormGroup({
      label: new FormControl(null),
      value: new FormControl(null),
    });
    (this.dataForm.get('dataFields') as FormArray).push(newDataField);
  }
}
