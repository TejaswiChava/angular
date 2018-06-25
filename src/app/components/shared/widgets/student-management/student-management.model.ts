export class StudentForm {
  name: string;
  id: string;
  department: string;
  program: string;
  cgpa: string;
  enrolled: string;
  shortlisted: string;
  offered: string;
  skills: any = [];
  interests: any = [];
  eventsInfo: EventInfo[];
}

export class EventInfo {
  eventName: string;
  eventId: number;
  companyName: string;
  eventType: string;
  eventDate: Date;
  eventStatus: string;
}

export class StudentFilterInput {
  programType: any = [];
  skills: any = [];
  interest: any = [];
}
