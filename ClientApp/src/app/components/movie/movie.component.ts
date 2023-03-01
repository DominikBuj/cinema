import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  hours = Array.from(Array(13).keys());
  minutes = Array.from(Array(60).keys());
  routeSubscription!: Subscription;
  id: number | null = null;
  movieForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      posterUrl: [''],
      durationHours: ['', [Validators.required]],
      durationMinutes: ['', [Validators.required]],
    });
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = +params['movieId'];
      if (!!this.id)
        this.movieService
          .getMovieById(this.id)
          .subscribe((movie) => this.movieForm.patchValue(movie));
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  get form() {
    return this.movieForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.movieForm.invalid) return;
    const movie: Movie = this.movieForm.getRawValue();
    if (!!this.id) movie.id = this.id;
    this.movieService.addMovie(movie).subscribe({
      next: () => this.router.navigate(['/movies']),
      error: (error) => console.log(error),
    });
  }
}
