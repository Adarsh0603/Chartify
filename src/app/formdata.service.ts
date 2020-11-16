import { Subject } from 'rxjs';
import { CurrentFormData } from './dataform/formData.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormdataService {
  formData: CurrentFormData;
  error = new Subject<string>();
  constructor() {}

  setFormData(formData: CurrentFormData) {
    this.formData = formData;
  }
}
