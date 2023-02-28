import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Viewing } from 'src/app/models/viewing.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  routeSubscription!: Subscription;
  movie?: Movie;
  possibleDates: string[] = [];
  possibleViewings?: Viewing[] = [];
  seats: any[] = [...Array(80)].map(() => {
    return {
      reserved: false,
      selected: false
    }
  });
  viewingForm!: FormGroup;
  seatsForm!: FormGroup;
  reservationForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.viewingForm = this.formBuilder.group({
      movieId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      viewingId: ['', [Validators.required]],
    });
    this.seatsForm = this.formBuilder.group({
      selectedSeats: ['', [Validators.required]]
    });
    this.reservationForm = this.formBuilder.group({

    });
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.movieService.getMovieById(+params['movieId']).subscribe((movie) => {
        this.movie = movie;
        this.formOne.movieId.setValue(this.movie.id);
        this.updatePossibleDates();
        this.updatePossibleViewings();
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  get formOne() {
    return this.viewingForm.controls;
  }

  get formTwo() {
    return this.seatsForm.controls;
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  updatePossibleDates(): void {
    this.formOne.date.setValue(null);
    this.possibleDates = [];
    this.movie?.viewings.forEach((viewing) => {
      if (!this.possibleDates.includes(viewing.date))
        this.possibleDates.push(viewing.date);
    });
  }

  updatePossibleViewings(): void {
    this.formOne.viewingId.setValue(null);
    this.possibleViewings = this.movie?.viewings.filter(
      (viewing) => viewing.date === this.formOne.date.value
    );
  }

  reserveSeat(seatIndex: number): void {
    this.formTwo.selectedSeats.setValue(null);
    if (!this.seats[seatIndex].reserved) this.seats[seatIndex].selected = !this.seats[seatIndex].selected;
    const selectedSeats: number[] = [];
    this.seats.forEach((seatValue, seatIndex) => {
      if (!seatValue.reserved && seatValue.selected) selectedSeats.push(seatIndex);
    });
    if (selectedSeats.length > 0 ) this.formTwo.selectedSeats.setValue(selectedSeats);
    console.log(this.formTwo.selectedSeats.value);
  }

  onViewingFormSubmit() {
    console.log(this.viewingForm.getRawValue());
    // this.submitted = true;
    // if (this.viewingForm.invalid) return;
    // const movie: Movie = this.movieForm.getRawValue();
    // if (!!this.id) movie.id = this.id;
    // this.movieService.addMovie(movie).subscribe({
    //   next: () => this.router.navigate(['/movies']),
    //   error: (error) => console.log(error),
    // });
  }
}
