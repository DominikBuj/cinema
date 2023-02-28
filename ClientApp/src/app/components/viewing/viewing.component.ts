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
  styleUrls: ['./viewing.component.css']
})
export class ViewingComponent implements OnInit {
  movies$?: Observable<Movie[]>;
  routeSubscription!: Subscription;
  id: number | null = null;
  viewingForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private viewingservice: ViewingService,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.viewingForm = this.formBuilder.group({
      movie: ['', [Validators.required]],
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
    this.movies$ = this.movieService.getMovies();
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      // if (!!this.id)
      //   this.movieService
      //     .getMovieById(this.id)
      //     .subscribe((movie) => this.movieForm.patchValue(movie));
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  get form() {
    return this.viewingForm.controls;
  }

  get today(): string {
    return new Date().toISOString().split("T")[0];
  }

  get startTimes(): string[] {
    const hours: string[] = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'];
    const minutes: string[] = ['00', '15', '30', '45'];
    let startTimes: string[] = [];
    hours.forEach(hour => {
      minutes.forEach(minute => {
        startTimes.push(hour + ':' + minute);
      })
    });
    return startTimes;
  }

  setEndTime(startTime: string): void {
    this.form.endTime.setValue('');
  }

  onSubmit() {
    this.submitted = true;
    if (this.viewingForm.invalid) return;
    console.log(this.viewingForm.getRawValue());
    const viewing: Viewing = this.viewingForm.getRawValue();
    // if (!!this.id) movie.id = this.id;
    // this.movieService.addMovie(movie).subscribe({
    //   next: () => this.router.navigate(['/movies']),
    //   error: (error) => console.log('error'),
    // });
  }
}
