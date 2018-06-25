import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'orgDataFilter'
})
export class OrgDataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row =>
      row.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
   return array;
}

}

