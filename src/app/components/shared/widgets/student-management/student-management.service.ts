import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../../apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentManagementService {
  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) {}

  formatfunction = function(searchData: any = []): any[] {
    return searchData.map(function (students) {
      return {
        name: students.studentDetails.firstName + ` ` + students.studentDetails.lastName,
        id: students.studentDetails.studentId,
        department: students.studentDetails.depName,
        program: students.studentDetails.programName,
        cgpa: students.studentDetails.cgpaScore,
        enrolled: students.eventDetails.totalEnrolled,
        shortlisted: students.eventDetails.totalShortlisted,
        offered: students.eventDetails.totalOffers,
        skills: students.skills,
        intrests: students.intrests,
        eventsInfo: students.eventDetails.events.map(function (event) {
          if (Object.keys(event).length !== 0) {
            return {
              studentListId: event.studentListId,
              employerEventId: event.employerEventId,
              campusId: event.campusId,
              eventName: event.details.eventName,
              eventId: event.campusEventId,
              companyName: event.eventStudentListIbfk3rel.name,
              candidateValueId: event.candidateStatusValueId,
              eventType: event.details.campusEventIbfk5rel.lookupValue,
              eventDate: event.details.scheduledDate,
              eventStatus: event.details.campusEventIbfk6rel.lookupValue,
              eventStatusId: event.details.campusEventIbfk6rel.lookupValueId,

              // Offer status has to be changed to be brought down into event array else it can't be shown here
            };
          }
        }),
      };
    });
  };

  filterSkills(studentInfo: any = [], inputSkills: any = []) {
    let resultArray = [];
    studentInfo.map(function(students){
      students.skills.filter(function(skillItem) {
        if (inputSkills.includes(skillItem.skillData.lookupValueId)) {
          if (resultArray.indexOf(students) === -1) {
            resultArray.push(students);
          }
        }
      });
    });
    return (resultArray);
  }

  filterInterestfunction(studentInfo: any = [], inputInterests: any = []): any[] {
    let resultArray = [];
    studentInfo.map(function(students){
      students.intrests.filter(function(interest) {
        if (inputInterests.includes(interest.intrestsData.lookupValueId)) {
          if (resultArray.indexOf(students) === -1) {
            resultArray.push(students);
          }
        }
      });
    });
    return (resultArray);
  }

  filterProgramfunction(studentInfo: any = [], inputProgram: any = []): any[] {
    let resultArray = [];
    studentInfo.map(function(students){
      students.eventsInfo.filter(function(eventsInfo) {
        console.log(eventsInfo.eventId);
        if (inputProgram.includes(eventsInfo.eventId)) {
          if (resultArray.indexOf(students) === -1) {
            resultArray.push(students);
          }
        }
      });
    });
    return (resultArray);
  }

  removeFromEvents(studentInfo: any = {}) {
    return this.httpClient.put(
      AppSettings.API_ENDPOINT + `EventStudentLists/removeStudent`, studentInfo).map((res: Response) => {
      }
    );
  }
  getProgramEvents(campusId) {
    return this.httpClient.get(
      AppSettings.API_ENDPOINT + `CampusEvents/getAllEventsOfMyCampus?campusId=` + campusId).map((res: Response) => res);
  }


  removeButton(events) {
    let candidateValueId;
    let candidateValue;
    console.log('this is event' +  JSON.stringify( events));
   for ( let i = 0 ; i < events.length; i++ ) {
      candidateValueId = events[i].candidateValueId;
      console.log('this is in for loop' + candidateValueId);
      if ( candidateValueId !== 380 && candidateValueId !== 381 ) {
       return  candidateValue = true;
      }
   }
  }

}
