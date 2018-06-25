import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companySearch'
})
export class CompanySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
