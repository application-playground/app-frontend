import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
