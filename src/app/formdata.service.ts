import { CurrentFormData } from './dataform/formData.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormdataService {
  formData: CurrentFormData;
  constructor() {}

  setFormData(formData: CurrentFormData) {
    this.formData = formData;
  }
}
