import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Assuming this would be cached somehow from a login call.
  public authTokenStale = 'stale_auth_token';
  public authTokenNew = 'new_auth_token';
  public currentToken: string;

  constructor() {
    this.currentToken = this.authTokenStale;
  }

  getAuthToken() {
    return this.currentToken;
  }

  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */

    this.currentToken = this.authTokenNew;

    return of(this.authTokenNew).pipe(delay(200));
  }
}
