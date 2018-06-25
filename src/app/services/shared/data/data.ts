export class Data {
    response: any;
    status: any;
    constructor(json) {
      this.status = json.status;
      this.response = '--------';
    }
  }