import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from '../../dtos/auth/UserDto';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth service used to authenticate users.
 * @author jonathanlee <jonathan.lee.devel@gmail.com>
 */
export class AuthService {
  public static readonly DEFAULT_USER: UserDto = {
    name: 'John Doe',
  };
  private static readonly USER_DATA_KEY: string = 'userInfo';
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() userInfo: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  /**
   * Standard constructor
   * @param {HttpClient} httpClient used to access backend API
   * @param {CookieService} cookieService used to access cookies
   */
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) {
    this.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.setUserInfo(AuthService.DEFAULT_USER);
      }
    });
  }

  /**
   * Used to determine if a user is authenticated.
   * @return {Observable} boolean indicating if user is authenticated
   */
  public isAuthenticated(): boolean {
    const userData = sessionStorage.getItem(AuthService.USER_DATA_KEY);
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData) {
        return true;
      }
    }
    return false;
  }

  /**
   * Allow for subscription to isLoggedIn event emitter.
   * @return {Observable<boolean>} observable for isLoggedIn event emitter
   */
  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn;
  }

  /**
   * Sets user info to a JSON-stringified version of parameter passed.
   * @param {UserDto} userInfo user info to be set
   */
  setUserInfo(userInfo: UserDto): void {
    sessionStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(userInfo));
  }

  /**
   * Deletes user info from local storage.
   */
  deleteUserInfo(): void {
    sessionStorage.removeItem(AuthService.USER_DATA_KEY);
  }

  /**
   * Logs out from backend.
   * @return {Observable<any>} unused observable for subscription
   */
  logout(): Observable<any> {
    this.deleteUserInfo();
    this.isLoggedIn.next(false);
    const headers = new HttpHeaders({'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')});
    return this.httpClient.post<any>(`${environment.MAIN_API_URL}/logout`, {}, {headers, withCredentials: true});
  }
}
