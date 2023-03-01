import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}api/movies`;
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}`, movie);
  }

  deleteMovie(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
