import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'notifications'
})
export class NotificationsPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
        return _.filter(array, row =>
        row.notificationTemplate.messageText.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    return array;
    // tslint:disable-next-line:no-trailing-whitespace
    
}

}
