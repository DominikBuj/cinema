import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl: string = 'http://localhost:5000/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  getMoviePossibleStartTimes(
    id: number,
    viewingDate: string
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.baseUrl}/${id}/${viewingDate}/possibleStartTimes`
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}`, movie);
  }

  deleteMovie(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
