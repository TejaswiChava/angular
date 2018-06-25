import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import {Data} from './data';
@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrls: ['./drives.component.css']
})
export class DrivesComponent implements OnInit , OnChanges {
@Input()sendDriveData: any = [];
// @Input()dummyDriveData: any = [];
// @Input()sendDriveData: any = [];
  loadingIndicator = false;
  reorderable = true;
  @Input() rows: any = [];
  @Input() columns: any = [];


  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sendDriveData']) {
      if (this.sendDriveData) {
        if (this.sendDriveData.length === 0) {
          this.sendDriveData = Data;
        }
      }
      this.columns = [];
      if (this.sendDriveData) {
        // const dupColumns = [];
        const dupColumns: any[] = Object.keys(this.sendDriveData[0]);
        for (let i = 0; i < dupColumns.length; i++) {
          this.columns.push({prop: dupColumns[i]});
        }
      }
      this.rows = this.sendDriveData;
    }
  }

}
