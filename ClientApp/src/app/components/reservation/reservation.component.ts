import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { Viewing } from 'src/app/models/viewing.model';
import { MovieService } from 'src/app/services/movie.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { ViewingService } from 'src/app/services/viewing.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  routeSubscription!: Subscription;
  user: User | null = null;
  movie?: Movie;
  viewing?: Viewing;
  selectedSeats: string = '';
  possibleDates: string[] = [];
  possibleViewings: Viewing[] = [];
  seats: any[] = [...Array(30)].map(() => {
    return {
      reserved: false,
      selected: false,
    };
  });
  viewingForm!: FormGroup;
  seatsForm!: FormGroup;
  reservationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private userService: UserService,
    private reservationService: ReservationService,
    private viewingService: ViewingService
  ) {}

  ngOnInit(): void {
    this.viewingForm = this.formBuilder.group({
      movieId: ['', [Validators.required]],
      viewingDate: ['', [Validators.required]],
      viewingId: ['', [Validators.required]],
    });
    this.seatsForm = this.formBuilder.group({
      selectedSeats: ['', [Validators.required]],
    });
    this.reservationForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      viewingId: ['', [Validators.required]],
      selectedSeats: ['', [Validators.required]],
    });
    this.userService.user.subscribe((user) => {
      this.user = user;
      this.formThree.userId.setValue(this.user?.id);
    });
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.movieService.getMovieById(+params['movieId']).subscribe((movie) => {
        this.movie = movie;
        this.formOne.movieId.setValue(this.movie.id);
        this.updatePossibleDates();
        this.updatePossibleViewings();
        this.updateSeats();
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

  get formThree() {
    return this.reservationForm.controls;
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  updatePossibleDates(): void {
    this.possibleDates = [];
    this.movie?.viewings.forEach((viewing) => {
      if (!this.possibleDates.includes(viewing.date))
        this.possibleDates.push(viewing.date);
    });
  }

  updatePossibleViewings(): void {
    this.possibleViewings = [];
    if (!!this.movie) {
      this.possibleViewings = this.movie.viewings.filter(
        (viewing) => viewing.date === this.formOne.viewingDate.value
      );
    }
  }

  updateSeats(): void {
    this.seats = [...Array(30)].map(() => {
      return {
        reserved: false,
        selected: false,
      };
    });
    this.viewing?.reservations?.forEach((reservation) => {
      reservation.selectedSeats
        .split(',')
        .map(Number)
        .forEach(
          (selectedSeat) => (this.seats[selectedSeat - 1].reserved = true)
        );
    });
  }

  selectViewingDate(): void {
    this.updatePossibleViewings();
    this.updateSeats();
  }

  selectViewing(): void {
    this.formThree.viewingId.setValue(null);
    this.updateSeats();
    this.viewingService.getViewingById(+this.formOne.viewingId.value).subscribe(viewing => {
      this.viewing = viewing;
      this.formThree.viewingId.setValue(this.viewing.id);
      this.updateSeats();
    });
  }

  selectSeat(seatIndex: number): void {
    this.selectedSeats = '';
    this.formTwo.selectedSeats.setValue(null);
    this.formThree.selectedSeats.setValue(null);
    if (!this.seats[seatIndex].reserved)
      this.seats[seatIndex].selected = !this.seats[seatIndex].selected;
    const selectedSeats: number[] = [];
    this.seats.forEach((seatValue, seatIndex) => {
      if (!seatValue.reserved && seatValue.selected)
        selectedSeats.push(seatIndex + 1);
    });
    if (selectedSeats.length > 0) {
      this.selectedSeats = selectedSeats.toString();
      this.formTwo.selectedSeats.setValue(this.selectedSeats);
      this.formThree.selectedSeats.setValue(this.selectedSeats);
    }
  }

  onSubmit() {
    if (this.reservationForm.invalid) return;
    this.reservationService
      .addReservation(this.reservationForm.getRawValue())
      .subscribe({
        next: () => this.router.navigate(['/movies']),
        error: (error) => console.log(error),
      });
  }
}
