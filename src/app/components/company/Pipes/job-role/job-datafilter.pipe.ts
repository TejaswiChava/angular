import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'jobDatafilter',
    pure: false 
})
export class JobDatafilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row =>
            row.jobRoleName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }

        return array;
        // tslint:disable-next-line:no-trailing-whitespace
        
    }
}
