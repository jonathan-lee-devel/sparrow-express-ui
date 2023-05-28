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
  /**
   * Standard constructor.
   * @param {TestService} testService used to check API access
   * @param {AuthService} authService used to authenticate
   * @param {Router} router used to route based on authentication success/failure
   */
  constructor(private testService: TestService,
              private authService: AuthService,
              private router: Router) {
  }

  /**
   * Standard ngOnInit method which updates the auth service.
   */
  ngOnInit() {
    this.authService.setUserInfo(AuthService.DEFAULT_USER);
    this.authService.isLoggedIn.next(true);
    this.router.navigate(['/']).then((_) => {});
  }
}
