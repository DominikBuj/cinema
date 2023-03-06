import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:5000/api/users';
  user: BehaviorSubject<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user = localStorage.getItem('user')
      ? new BehaviorSubject<User | null>(
          JSON.parse(localStorage.getItem('user')!)
        )
      : new BehaviorSubject<User | null>(null);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  signIn(params: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/sign-in`, params).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
        return user;
      })
    );
  }

  signUp(params: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/sign-up`, params).pipe(
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
    this.router.navigate(['/user/sign-in']);
  }

  updateUser(id: number, params: any): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, params).pipe(
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
