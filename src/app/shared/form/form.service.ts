import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  isValidInput(form: FormGroup, inputValue): boolean {
    return form.controls[inputValue].invalid &&
      (form.controls[inputValue].dirty || form.controls[inputValue].touched);
  }

  isRequired(form: FormGroup, inputValue): boolean {
    return form.controls[inputValue].errors.required;
  }
}
