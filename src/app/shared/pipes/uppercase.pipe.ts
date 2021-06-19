/*
This Pipe already exists in Angular, this is only for tutorial purpose!!!
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper'
})
export class UppercasePipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    const transformedValue = value.toUpperCase();
    return transformedValue;
  }

}
