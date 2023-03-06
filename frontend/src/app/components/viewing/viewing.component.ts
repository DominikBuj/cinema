import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Viewing } from 'src/app/models/viewing.model';
import { MovieService } from 'src/app/services/movie.service';
import { ViewingService } from 'src/app/services/viewing.service';

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: ['./viewing.component.scss']
})
export class ViewingComponent implements OnInit {
  movies$?: Observable<Movie[]>;
  startTimes: string[] = [];
  routeSubscription!: Subscription;
  id: number | null = null;
  viewingForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private viewingService: ViewingService,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.viewingForm = this.formBuilder.group({
      movieId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
    this.movies$ = this.movieService.getMovies();
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = +params['viewingId'];
      if (!!this.id)
        this.viewingService
          .getViewingById(this.id)
          .subscribe((viewing) => this.viewingForm.patchValue(viewing));
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  get form() {
    return this.viewingForm.controls;
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  updateStartTimes(): void {
    this.form['startTime'].setValue(null);
    this.form['endTime'].setValue(null);
    this.movieService.getMoviePossibleStartTimes(this.form['movieId'].value, this.form['date'].value)
      .subscribe(possibleStartTimes => this.startTimes = possibleStartTimes);
  }

  setEndTime(startTime: string): void {
    const startTimes: string[] = startTime.split(':');
    let hour = +startTimes[0];
    let minutes = +startTimes[1];
    this.movieService
      .getMovieById(this.form['movieId'].value)
      .subscribe((movie) => {
        hour += movie.durationHours;
        minutes += movie.durationMinutes;
        while (minutes > 60) {
          hour += 1;
          minutes -= 60;
        }
        const hourString = hour < 10 ? '0' + hour : hour;
        const minutesString = minutes < 10 ? '0' + minutes : minutes;
        this.form['endTime'].setValue(hourString + ':' + minutesString + ':00');
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.viewingForm.invalid) return;
    const viewing: Viewing = this.viewingForm.getRawValue();
    if (!!this.id) viewing.id = this.id;
    this.viewingService.addViewing(viewing).subscribe({
      next: () => this.router.navigate(['/viewings']),
      error: (error) => console.log(error),
    });
  }
}
