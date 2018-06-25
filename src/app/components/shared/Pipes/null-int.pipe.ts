import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullInt'
})
export class NullIntPipe implements PipeTransform {

  transform(value) {
    if (value === null) {
      return 0;
  } else {
    return value;
  }

}
}
