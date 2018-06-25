import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedDriveService {
    // private caseNumber: any;

    // Observable string sources
  private caseNumber = new Subject<any>();

  // Observable string streams
  caseNumber$ = this.caseNumber.asObservable();

    // Service message commands
  publishData(data: boolean) {
    console.log("shared data::"+data);
    this.caseNumber.next(data);
  }


    // publishData(data: string) {
    //     console.log('Inside publish data: ' + data);
    //     this.caseNumber = data;
    // }

    // subscribeData() {
    //     console.log('Inside subscribeData: ' + this.caseNumber);
    //     return this.caseNumber;
    // }
}