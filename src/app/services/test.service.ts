import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private httpClient: HttpClient) { }

  getGreeting(): Observable<any> {
    return this.httpClient.get<any>(`${environment.MAIN_API_URL}/`);
  }
}
