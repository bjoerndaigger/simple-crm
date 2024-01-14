import { Component } from '@angular/core';
import { LoginService } from '../firebase-services/login.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {

  constructor(public loginService: LoginService) { }
}
