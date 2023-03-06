import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  user: User | null = null;
  movies$?: Observable<Movie[]>;

  constructor(
    private movieService: MovieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user) => (this.user = user));
    this.movies$ = this.movieService.getMovies();
  }

  deleteMovie(movieId: number): void {
    this.movieService
      .deleteMovie(movieId)
      .subscribe(() => (this.movies$ = this.movieService.getMovies()));
  }
}
