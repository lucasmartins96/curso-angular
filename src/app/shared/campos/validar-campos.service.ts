import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasError(control: AbstractControl, errorName: string): boolean {
    if ((control.dirty || control.touched) && control.hasError(errorName)) {
      return true;
    } else {
      return false;
    }
  }
}
