import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-button',
  templateUrl: './contact-button.component.html',
  styleUrls: ['./contact-button.component.css']
})
export class ContactButtonComponent implements OnInit {

  email: string;
  message: string;
  data: {};
  constructor() { }

  sendToEntity(): void {
    this.data = {email: this.email, message: this.message};

  }

  ngOnInit() {
  }

}
