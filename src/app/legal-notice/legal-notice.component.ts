import { Component, OnInit } from '@angular/core';
import { LoginService } from '../firebase-services/login.service';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.showActiveUser();
  }
}
