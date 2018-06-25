import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actions-create-campus-event',
  templateUrl: './actions-create-campus-event.component.html',
  styleUrls: ['./actions-create-campus-event.component.css']
})
export class ActionsCreateCampusEventComponent implements OnInit {
  paramData: any;
  empEventId: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.empEventId = '';
    this.paramData = this.route.params.subscribe(params => {
      this.empEventId = params.id;
    });
  }

}
