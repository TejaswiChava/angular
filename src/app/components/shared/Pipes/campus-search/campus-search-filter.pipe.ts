import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'campusSearchFilter'
})
export class CampusSearchFilterPipe implements PipeTransform {

  transform(items, skillTypeValues, interestTypeValues) {
    if (!items) {
      return items;
    }
    if (skillTypeValues) {
      if (skillTypeValues.length === 0) {
        skillTypeValues = null;
      }
    }
    if (interestTypeValues) {
      if (interestTypeValues.length === 0) {
        interestTypeValues = null;
      }
    }

    if ( skillTypeValues || interestTypeValues) {
      let resultArray = items;
      if (skillTypeValues) {
        resultArray  = this.skillFilter(resultArray, skillTypeValues);
      }
      if (interestTypeValues) {
        resultArray  = this.interestFilter(resultArray, interestTypeValues);
      }
      return resultArray;
    }

    return items;
  }

  skillFilter (items, skillTypeValues) {
    // tslint:disable-next-line:prefer-const
    let skillResultArray = [];
    items.map(function (item) {
      console.log('...' + item);
      // item.filter(function (campusSearchData) {
        if (skillTypeValues) {
          item.skills.filter(function (campusSkillSearchData) {
            if (skillTypeValues.includes(campusSkillSearchData.id)) {
              if (skillResultArray.indexOf(item) === -1) {
                skillResultArray.push(item);
              }
            }
          });
        }
      // });
    });
    return (skillResultArray);
  }

  interestFilter (items, interestTypeValues) {
    // tslint:disable-next-line:prefer-const
    let interestResultArray = [];
    items.map(function (item) {
      // item.filter(function (campusSearchData) {
        if (interestTypeValues) {
          item.interests.filter(function (campusInterestSearchData) {
            if (interestTypeValues.includes(campusInterestSearchData.id)) {
              if (interestResultArray.indexOf(item) === -1) {
                interestResultArray.push(item);
              }
              // interestResultArray.indexOf(item) === -1 ? interestResultArray.push(item) : console.log('This item already exists');
            }
          });
        }
      // });
    });
    return (interestResultArray);
  }

}




