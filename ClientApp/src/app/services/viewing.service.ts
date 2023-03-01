import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viewing } from '../models/viewing.model';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}api/viewings`;
  }

  getViewings(): Observable<Viewing[]> {
    return this.http.get<Viewing[]>(`${this.baseUrl}`);
  }

  getViewingById(id: number): Observable<Viewing> {
    return this.http.get<Viewing>(`${this.baseUrl}/${id}`);
  }

  addViewing(viewing: Viewing): Observable<Viewing> {
    return this.http.put<Viewing>(`${this.baseUrl}`, viewing);
  }

  deleteViewing(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
