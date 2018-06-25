
import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'eventStudentList'
})
// export class EventStudentListPipe implements PipeTransform {
//     transform(students: any[], searchText: string): any[] {
//       if (!students) {
//         return [];
//       }
//       if (!searchText) {
//         return students;
//       }
//     searchText = searchText.toLowerCase();
//     return students.filter( student => {
//         return student.StudentInfo.student.firstName.toLowerCase().includes(searchText);
//       });
//      }
//   }

  export class EventStudentListPipe implements PipeTransform {
    transform(students: any[], searchText: string): any[] {
        const searchableList = ['firstName', 'lastName', 'programName'];
        if (!students) {
            return [];
        }
        if (!searchText) {
            return students;
        }
        if (searchText) {
            searchText = searchText.toLowerCase();
            return students.filter(function (student: any) {
                let isTrue = false;
                for (let i = 0; i < searchableList.length; i++ ) {
                    // return student.StudentInfo.student[searchableList[i]].toLowerCase().includes(searchText);
                    const studentInput = student.studentDetails === undefined ? 'studentInfo' : 'studentDetails';
                    if (student[studentInput][searchableList[i]] != null) {
                        if (student[studentInput][searchableList[i]].toLowerCase().indexOf(searchText) > -1) {
                            isTrue = true;
                        }
                        if (isTrue) {
                            return student;
                        }
                    }
                }
            });
        }
    }
}

