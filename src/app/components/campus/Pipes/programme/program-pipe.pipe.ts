import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'programPipe'
})
export class ProgramPipePipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row =>
         
            row.programName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;

    }
}
