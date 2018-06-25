
import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'departmentDataFilter'
})
export class DepartmentPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
          return _.filter(array, row => 
            row.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }

        return array;

    }
}
