// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'checkedCampusList'
// })
// export class CheckedCampusListPipe implements PipeTransform {

//   transform(value: any, args?: any): any {
//     return null;
//   }

// }

import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'checkedCampusList'
})
export class CheckedCampusListPipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.campusName.indexOf(query) > -1);
    }
    return array;

  }
}
