import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'selectedCampusList'
})
export class SelectedCampusListPipe implements PipeTransform {
  transform(array: any[], query: string): any {

    if (query) {
      return _.filter(array, row =>
      row.employerCampusListDtlCampus.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
    return array;

  }
}
