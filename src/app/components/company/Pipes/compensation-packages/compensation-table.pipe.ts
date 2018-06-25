import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'compensationTable'
})
export class CompensationTablePipe implements PipeTransform {


  transform(array: any[], query: string): any {
   
    if (query) {
      return _.filter(array, row =>
   
      row.compPackageName.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
 
    return array;
}

}
