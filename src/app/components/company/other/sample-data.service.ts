import { Injectable } from '@angular/core';

@Injectable()
export class CompanyDashboardSampleDataService {
  private CampusHiringGraph = [
    {
      name: 'Campus 1',
      value: 5
    },
    {
      name: 'Campus 2',
      value: 8
    },
    {
      name: 'Campus 3',
      value: 2
    },
    {
      name: 'Campus 4',
      value: 5
    },
    {
      name: 'Campus 5',
      value: 2
    },
    {
      name: 'Campus 6',
      value: 5
    },
    {
      name: 'Campus 7',
      value: 4
    },
    {
      name: 'Campus 8',
      value: 6
    },
    {
      name: 'Campus 9',
      value: 3
    },
    {
      name: 'Other',
      value: 9
    }
  ];

  private EffectiveMulti = [
    {
      name: 'Angular Dev',
      series: [
        {
          name: 'Students Selected for Event',
          value: 34
        },
        {
          name: 'Students Shortlisted for Event',
          value: 26
        }
      ]
    },
    {
      name: 'QA',
      series: [
        {
          name: 'Students Selected for Event',
          value: 30
        },
        {
          name: 'Students Shortlisted for Event',
          value: 23
        }
      ]
    },
    {
      name: 'Node Dev',
      series: [
        {
          name: 'Students Selected for Event',
          value: 20
        },
        {
          name: 'Students Shortlisted for Event',
          value: 14
        }
      ]
    },
    {
      name: 'Java Dev',
      series: [
        {
          name: 'Students Selected for Event',
          value: 22
        },
        {
          name: 'Students Shortlisted for Event',
          value: 18
        }
      ]
    },
    {
      name: 'Mean Stack',
      series: [
        {
          name: 'Students Selected for Event',
          value: 20
        },
        {
          name: 'Students Shortlisted for Event',
          value: 16
        }
      ]
    }
  ];

  private AverageSalary = [
    {
      name: 'ORG 1',
      value: 35
    },
    {
      name: 'ORG 2',
      value: 30
    },
    {
      name: 'ORG 3',
      value: 32
    },
    {
      name: 'ORG 4',
      value: 31
    },
    {
      name: 'ORG 5',
      value: 28
    },
    {
      name: 'ORG 6',
      value: 33
    }
  ];

  private DriveDetailRows: [
    {
      'Drive Name': 'QA Hiring';
      'No. of Events': 8;
      'Events Scheduled': 2;
      'Events in Progress': 2;
    },
    {
      'Drive Name': 'Node Hiring';
      'No. of Events': 5;
      'Events Scheduled': 2;
      'Events in Progress': 2;
    },
    {
      'Drive Name': 'FrontEnd Developers';
      'No. of Events': 4;
      'Events Scheduled': 2;
      'Events in Progress': 2;
    },
    {
      'Drive Name': 'BackEnd Developers';
      'No. of Events': 6;
      'Events Scheduled': 2;
      'Events in Progress': 2;
    },
    {
      'Drive Name': 'Angular Hiring';
      'No. of Events': 7;
      'Events Scheduled': 2;
      'Events in Progress': 2;
    },
    {
      'Drive Name': 'FullStack Developer';
      'No. of Events': 3;
      'Scheduled and Progress': 2;
      'Events in Progress': 2;
    }
  ];

  private DriveDetailColumns = [
    { prop: 'Drive Name' },
    { prop: 'No. of Events' },
    { prop: 'Events Scheduled' },
    { prop: 'Events in Progress' }
  ];

  private RecentPlacementsRows = [
    {
      'Program Name': 'Prg 1',
      'Campus Name': 'Campus 1',
      'Job Role': 'QA Engineer'
    },
    {
      'Program Name': 'Prg 2',
      'Campus Name': 'Campus 2',
      'Job Role': 'Software Engineer'
    },
    {
      'Program Name': 'Prg 3',
      'Campus Name': 'Campus 3',
      'Job Role': 'Node Developer'
    },
    {
      'Program Name': 'Prg 4',
      'Campus Name': 'Campus 4',
      'Job Role': 'Backend Engineer'
    },
    {
      'Program Name': 'Prg 5',
      'Campus Name': 'Campus 5',
      'Job Role': 'QA Engineer'
    },
    {
      'Program Name': 'Prg 6',
      'Campus Name': 'Campus 6',
      'Job Role': 'Software Engineer'
    }
  ];

  private RecentPlacementsColumn = [
    { prop: 'Program Name' },
    { prop: 'Campus Name' },
    { prop: 'Job Role' }
  ];

  private UpcomingEventsRows = [
    {
      'Event Name': 'QA Hiring',
      'Date': '25/12/2017',
      'Students Shortlisted': 15,
      'Event Type': 'On Campus'
    },
    {
      'Event Name': 'Software Engineering',
      'Date': '25/12/2017',
      'Students Shortlisted': 18,
      'Event Type': 'On Campus'
    },
    {
      'Event Name': 'Qa Hiring',
      'Date': '27/12/2017',
      'Students Shortlisted': 10,
      'Event Type': 'Off Campus'
    },
    {
      'Event Name': 'Software Developer',
      'Date': '28/01/2018',
      'Students Shortlisted': 12,
      'Event Type': 'On Campus'
    },
    {
      'Event Name': 'Manager',
      'Date': '2/01/2017',
      'Students Shortlisted': 17,
      'Event Type': 'On Campus'
    },
    {
      'Event Name': 'Quality Engineer',
      'Date': '1/01/2017',
      'Students Shortlisted': 20,
      'Event Type': 'Off Campus'
    }
  ];

  private UpcomingEventsColumns = [
    { prop: 'Event Name' },
    { prop: 'Date' },
    { prop: 'Students Shortlisted' },
    { prop: 'Event Type' }
  ];


  public getCampusHiringGraph() {
    return this.CampusHiringGraph;
  }

  public getEffectiveGraph() {
    return this.EffectiveMulti;
  }


  public getAverageSalary() {
    return this.getAverageSalary;
  }

  public getDriveDetailsRow() {
    return this.getDriveDetailsRow;
  }

  public getDriveDetailsColumn() {
    return this.DriveDetailColumns;
  }

  public getRecentPlacementsRows() {
    return this.RecentPlacementsRows;
  }

  public getRecentPlacementsColumn() {
    return this.RecentPlacementsColumn;
  }

  public getUpcomingEventsRows() {
    return this.UpcomingEventsRows;
  }

  public getUpcomingEventsColumn() {
    return this.UpcomingEventsColumns;
  }
}
