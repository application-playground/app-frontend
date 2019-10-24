import { PageModel } from 'src/app/Model/page.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private context: string = "";
  constructor(private http: HttpClient) {
    this.context = environment.API_URL;
  }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  getRegistrationData(requestURL: string, page: PageModel) {    
    return this.http.get(this.context + requestURL, {
      params: new HttpParams()
        // .set('courseId', courseId.toString())
        .set('pageNumber', page.pageNumber.toString())
        .set('pageSize', page.size.toString())
        .set('search', page.search)
        .set('sortOrder', page.sortFields)
    });
  }

  exportCSV(requestURL: string) {    
    return this.http.get(this.context + requestURL);
  }

  register(user: User) {    
    return this.http.post(this.context + 'users/register', user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
