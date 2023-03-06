import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/models/reservation.model';
import { User } from 'src/app/models/user.model';
import { MovieService } from 'src/app/services/movie.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription;
  viewingId: number | null = null;
  user: User | null = null;
  reservations?: Reservation[];

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private movieService: MovieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.viewingId = +params['viewingId'];
      this.userService.user.subscribe((user) => {
        this.user = user;
        this.getReservations();
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  getReservations(): void {
    if (this.user?.role === 'Admin' && !!this.viewingId) {
      this.reservationService.getReservationsByViewingId(this.viewingId).subscribe((reservations) => {
        this.reservations = reservations;
        this.reservations.forEach((reservation) =>
          this.movieService
            .getMovieById(reservation.viewing.movieId)
            .subscribe((movie) => (reservation.viewing.movie = movie))
        );
      });
    } else if (!!this.user?.id) {
      this.reservationService.getReservationsByUserId(this.user.id).subscribe((reservations) => {
        this.reservations = reservations;
        this.reservations.forEach((reservation) =>
          this.movieService
            .getMovieById(reservation.viewing.movieId)
            .subscribe((movie) => (reservation.viewing.movie = movie))
        );
      });
    }
  }

  cancelReservation(reservationId: number): void {
    this.reservationService.deleteReservation(reservationId).subscribe(() => this.getReservations());
  }
}
