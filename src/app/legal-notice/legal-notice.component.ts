import { Component, OnInit } from '@angular/core';
import { LoginService } from '../firebase-services/login.service';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit {

  /**
   * Creates an instance of LegalNoticeComponent.
   * @param loginService - The service handling login data.
   */
  constructor(private loginService: LoginService) {
  }

  /**
   * Lifecycle hook called after the component is initialized.
   * Monitors which user is logged in.
   */
  ngOnInit(): void {
    this.loginService.showActiveUser();
  }
}
