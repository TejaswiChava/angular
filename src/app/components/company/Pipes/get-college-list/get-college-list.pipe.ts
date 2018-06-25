
import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getCollegeList'
})
export class GetCollegeListPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row =>
                row.campusName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;


    }
}
