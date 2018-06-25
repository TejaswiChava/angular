import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDatePipe'
})

export class OrderByDatePipe implements PipeTransform{

 transform(array: Array<string>, args: string): Array<string> {

  if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      alert(a.notificationDetails.createDatetime);
      if (a.notificationDetails.createDatetime < b.notificationDetails.createDatetime) {
        return 1;
      } else if (a.notificationDetails.createDatetime > b.notificationDetails.createDatetime) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }

}