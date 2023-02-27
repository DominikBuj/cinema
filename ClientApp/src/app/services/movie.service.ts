import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl: string;
  movies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}api`;
    this.getMovies().subscribe((movies) => this.movies.next(movies));
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }

  addMovie(movie: any): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/movies`, movie).pipe(
      tap((movie) => {
        const movies = this.movies.value;
        const index = this.movies.value.findIndex(
          (_movie) => (_movie.id = movie.id)
        );
        index !== -1 ? (movies[index] = movie) : movies.push(movie);
        this.movies.next(movies);
      })
    );
  }

  deleteMovie(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/movies/${id}`).pipe(
      tap(() => {
        const movies = this.movies.value;
        const index = this.movies.value.findIndex((_movie) => (_movie.id = id));
        movies.splice(index, 1);
        this.movies.next(movies);
      })
    );
  }
}
