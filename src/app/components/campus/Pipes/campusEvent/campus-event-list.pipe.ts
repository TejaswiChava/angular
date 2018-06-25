import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'campusEventList'
})
export class CampusEventListPipe implements PipeTransform {
// for campus event main
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row =>
            row.eventName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;

    }
}

