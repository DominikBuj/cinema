import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}api/reservations`;
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}`);
  }

  getReservationsByUserId(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/users/${userId}`);
  }

  getReservationsByViewingId(viewingId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/viewings/${viewingId}`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}`, reservation);
  }

  deleteReservation(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
