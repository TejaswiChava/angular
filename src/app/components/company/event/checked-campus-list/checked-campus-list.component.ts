import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CheckedCampusListService } from '../../../../services/company/event/checkedCampusList/checked-campus-list.service';
import { InstituteService } from '../../../../services/campus/MasterData/institute/institute.service';

@Component({
  selector: 'app-checked-campus-list',
  templateUrl: './checked-campus-list.component.html',
  styleUrls: ['./checked-campus-list.component.css']
})
export class CheckedCampusListComponent implements OnInit, OnChanges {
  numberOfStudents: number;
  @Input() checkData;
  @Input() eventData;
  campusListByEvent: any;
  campusListByDrive: any;
  data: any= [] ;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'campusName';
  public sortOrder = 'asc';
  singleData: any = [];
  labelData: any;
  fetchdata: any = [];
  single = false;
  multiple = false;
  noData = true;
  noDetails = true;
  region = {
    E:'East Region',
    W:'West Region',
    N:'North Region',
    S:'South Region'
    }
  constructor(private checkList: CheckedCampusListService , private InstituteService: InstituteService) { }
  ngOnInit() {
    this.labelData = JSON.parse(localStorage.getItem('labelData'));
  }
  ngOnChanges(changes: SimpleChanges) {

    if (this.eventData) {
      // alert(123);
      // alert(JSON.stringify(this.eventData));
      if (this.eventData.eventTypeValueId === 310) {
        this.noDetails = false;
      }
      const geteve = {
        'empEventId': this.eventData.empEventId,
        'empDriveId': this.eventData.empDriveId
      };
      this.checkList.getDataByEventAndDrive(geteve).subscribe((data: any) => {
      this.fetchdata = data.data;
        console.log('1243' + JSON.stringify(this.fetchdata));
        this.InstituteService.getCampusDetailsByLogin(this.fetchdata[0].campusId).subscribe((res: any) => {
        this.numberOfStudents = res.data[0].numberOfStudents;
                 });
        if (this.fetchdata.length === 1) {
          // alert(1);
            
      // alert(res.data.numberOfStudents);
          this.singleData = this.fetchdata;
          this.single = true;
          this.noData = false;
        } else {
          // alert(2);
          this.data = this.fetchdata;
          this.multiple = true;
          this.noData = false;
        }
      });

      // this.checkList.getEventByEventId(this.eventData.empEventId).subscribe(data => {
      //   this.campusListByEvent = data;
      //   console.log('asd' + JSON.stringify(this.campusListByEvent));
      //   this.checkList.getCampusByDriveId(this.eventData.empDriveId).subscribe(data => {
      //     this.campusListByDrive = data;
      //     // alert(345);
      //     console.log('qwerty' + JSON.stringify(this.campusListByDrive));
      //     // debugger;
      //     if (this.campusListByDrive != '' && this.campusListByEvent != '') {
      //       for (let i = 0; i < this.campusListByEvent.length; i++) {
      //         const sampleCampusId = this.campusListByEvent[i].campusId;
      //         console.log(JSON.stringify(this.campusListByDrive));
      //         const fetchedData = this.campusListByDrive.find(data => data.campusDetails.campusId === sampleCampusId);
      //         // alert(fetchedData);
      //         // alert(456);
      //         this.fetchdata.push(fetchedData);
      //         // alert(this.fetchdata.length);
      //         console.log('234' + JSON.stringify(this.fetchdata));
      //       }
      //       if (this.fetchdata.length === 1) {
      //         // alert(1);
      //         this.singleData = this.fetchdata;
      //         this.single = true;
      //         this.noData = false;
      //       } else {
      //         // alert(2);
      //         this.data = this.fetchdata;
      //         this.multiple = true;
      //         this.noData = false;
      //       }
      //     }
      //   });
      // });


    }
    // this.InstituteService.getCampusDetailsByLogin(this.fetchdata[0].campusId).subscribe((res: any) => {
    //   this.numberOfStudents = res.data[0].numberOfStudents;
  }

}
