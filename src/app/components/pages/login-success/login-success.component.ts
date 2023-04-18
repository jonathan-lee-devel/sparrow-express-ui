import {Component, OnInit} from '@angular/core';
import {TestService} from '../../../services/test.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css'],
})
/**
 * Login success component, used on login success redirect in the backend.
 */
export class LoginSuccessComponent implements OnInit {
  constructor(private testService: TestService,
              private authService: AuthService,
              private router: Router) {
  }

  /**
   * Standard ngOnInit method which updates the auth service.
   */
  ngOnInit() {
    this.testService.getGreeting().subscribe((greeting) => {
      if (greeting) {
        this.authService.isLoggedIn.next(true);
        this.router.navigate(['/home']).then((_) => {});
      }
    });
  }
}
