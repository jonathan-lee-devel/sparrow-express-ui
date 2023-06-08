import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RegisterDto} from '../../dtos/register/RegisterDto';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  doRegister(email: string,
      firstName: string,
      lastName: string,
      password: string,
      confirmPassword: string,
      acceptTermsAndConditions: boolean) {
    this.httpClient.post<RegisterDto>(`${environment.MAIN_API_URL}/register`, {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      acceptTermsAndConditions,
    }).subscribe((registerDto) => {
      this.router.navigate(['/login']).catch((reason) => {
        window.alert(reason);
      });
      window.alert(registerDto.status);
    });
  }
}
