import { Component } from '@angular/core';
import { LoginService } from './firebase-services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';

  constructor(private loginService: LoginService, public router: Router) { }

  
  logOut() {
    this.loginService.signOut();
    this.router.navigate(['/']);
  }
}
