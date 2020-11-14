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
  type: string;

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      title: new FormControl(),
      dataFields: new FormArray([]),
    });
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
      label: new FormControl(null),
      color: new FormControl('#f1f1f1'),
      value: new FormControl(null),
    });
    (this.dataForm.get('dataFields') as FormArray).push(newDataField);
  }

  deleteField(index: number) {
    (this.dataForm.get('dataFields') as FormArray).removeAt(index);
    if (this.fields.length > 1) this.setGraphType(this.type);
  }
}
