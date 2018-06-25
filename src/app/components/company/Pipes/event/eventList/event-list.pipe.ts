import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'eventList'
})
export class EventListPipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row =>
      row.eventName.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
    return array;

  }
}
