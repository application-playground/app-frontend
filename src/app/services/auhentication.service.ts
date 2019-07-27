import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Model/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuhenticationService {

  private context: string = "";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.context = environment.API_URL;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createAuthorizationHeader(): HttpHeaders {
    // Just checking is this._options is null using lodash
    
      const headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      headers.append('Content-Type', 'application/json; charset=utf-8');     
    
    return headers;
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    debugger;
    return this.http.post<any>(this.context + 'users/authenticate', { email, password }, { headers : this.createAuthorizationHeader() } )
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
