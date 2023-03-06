import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viewing } from '../models/viewing.model';

@Injectable({
  providedIn: 'root',
})
export class ViewingService {
  baseUrl: string = 'http://localhost:5000/api/viewings';

  constructor(private http: HttpClient) {}

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
