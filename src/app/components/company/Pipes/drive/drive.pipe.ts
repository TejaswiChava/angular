

import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'drive'
})
export class DrivePipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row =>
            row.driveName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }

        return array;
        // tslint:disable-next-line:no-trailing-whitespace
        
    }
}



