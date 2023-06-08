import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RegisterDto} from '../../dtos/register/RegisterDto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) { }

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
      window.alert(registerDto.status);
    });
  }
}
