import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserDto} from '../../dtos/auth/UserDto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth service used to authenticate users.
 * @author jonathanlee <jonathan.lee.devel@gmail.com>
 */
export class AuthService {
  private static readonly USER_DATA_KEY: string = 'userInfo';

  private static readonly DEFAULT_USER: UserDto = {
    name: 'Loading...',
  };

  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() userInfo: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  /**
   * Standard constructor
   * @param {HttpClient} httpClient used to access backend API
   * @param {Router} router used to route based on login success/failure
   */
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  /**
   * Used to determine if a user is authenticated.
   * @return {Observable} boolean indicating if user is authenticated
   */
  public isAuthenticated(): boolean {
    const userData = localStorage.getItem(AuthService.USER_DATA_KEY);
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const successfulAuthentication =
        parsedUserData.loginStatus === 'SUCCESS';
      this.isLoggedIn.next(successfulAuthentication);
      return successfulAuthentication;
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
   * Allow for subscription to userInfo event emitter.
   * @return {Observable<UserDto>} observable for userInfo event emitter
   */
  public getUserInfo(): Observable<UserDto> {
    return this.userInfo;
  }

  /**
   * Method to obtain current user info.
   * @return {UserDto} current user info
   */
  public currentUserInfo(): UserDto {
    const userData = localStorage.getItem(AuthService.USER_DATA_KEY);
    if (userData) {
      return JSON.parse(userData).user;
    } else {
      return AuthService.DEFAULT_USER;
    }
  }

  /**
   * Sets user info to a JSON-stringified version of parameter passed.
   * @param {UserDto} userInfo user info to be set
   */
  setUserInfo(userInfo: UserDto): void {
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(userInfo));
  }

  /**
   * Deletes user info from local storage.
   */
  deleteUserInfo(): void {
    localStorage.removeItem(AuthService.USER_DATA_KEY);
  }

  /**
   * Logs out from backend.
   * @return {Observable<any>} unused observable for subscription
   */
  logout(): Observable<any> {
    this.deleteUserInfo();
    this.isLoggedIn.next(false);
    return this.httpClient.get<any>(`${environment.MAIN_API_URL}/logout`);
  }
}
