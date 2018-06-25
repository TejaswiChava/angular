import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'campusListSearch'
})
export class CampusListSearchPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row =>
            row.listName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;

    }
}
