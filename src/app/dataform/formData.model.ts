import { AbstractControl } from '@angular/forms';

export interface CurrentFormData {
  title: string;
  dataFields: AbstractControl[];
}
