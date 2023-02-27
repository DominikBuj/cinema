import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string;
  user: BehaviorSubject<User | null>;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private router: Router
  ) {
    this.baseUrl = `${baseUrl}api`;
    this.user = localStorage.getItem('user')
      ? new BehaviorSubject<User | null>(
          JSON.parse(localStorage.getItem('user')!)
        )
      : new BehaviorSubject<User | null>(null);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  signIn(params: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/sign-in`, params).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
        return user;
      })
    );
  }

  signUp(params: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/sign-up`, params).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
        return user;
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/sign-in']);
  }

  updateUser(id: number, params: any): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${id}`, params).pipe(
      map((user) => {
        if (this.user.value?.id === id) {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
        }
        return user;
      })
    );
  }
}
