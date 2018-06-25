import { Injectable } from '@angular/core';
import { Single } from '../../../components/company/other/company-dashboard.model';

@Injectable()
export class EmptyResponseService {
  constructor() {}

  /**
   * Service will check for empty resonse and will verify whether the response is not null or undefined
   *
   * @param {*} [inputData=[]]
   * @returns {boolean}
   * @memberof EmptyResponseService
   */
  checkResponse(inputData: any): boolean {
    if (typeof inputData === 'object') {
      return (
        (Object.keys(inputData).length !== 0 &&
          inputData.constructor === Array) ||
        inputData.constructor === Object
      );
    }
  }

  /**
   * Service will check if the value is undefined, will convert undefined into empty array.
   * @someArray Any array you check whether the input is undefined or not
   * @memberof EmptyResponseService
   */
  sterilize = function(someArray) {
    if (someArray === undefined || someArray === null) {
      someArray = [];
      return someArray;
    } else if (typeof someArray === 'number') {
      const anArray = [someArray];
      return anArray;
    } else {
      return someArray;
    }
  };

  objectIsEmpty = function(target) {
    for (const member in target) {
      if (target[member] !== '') {
        return true;
      }
    }
    return false;
  };
}
