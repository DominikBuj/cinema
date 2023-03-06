import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from './services/movie.service';
import { ReservationService } from './services/reservation.service';
import { UserService } from './services/user.service';
import { ViewingService } from './services/viewing.service';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewingsComponent } from './components/viewings/viewings.component';
import { ViewingComponent } from './components/viewing/viewing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewingsComponent,
    ViewingComponent,
    SignUpComponent,
    SignInComponent,
    ReservationsComponent,
    ReservationComponent,
    ProfileComponent,
    NavMenuComponent,
    MoviesComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatStepperModule,
    RouterModule.forRoot([
      { path: '', component: MoviesComponent, pathMatch: 'full' },
      { path: 'user/sign-in', component: SignInComponent },
      { path: 'user/sign-up', component: SignUpComponent },
      { path: 'user/profile', component: ProfileComponent },
      { path: 'user/reservations', component: ReservationsComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movie/:movieId', component: MovieComponent },
      { path: 'viewings', component: ViewingsComponent },
      { path: 'viewing/:viewingId', component: ViewingComponent },
      {
        path: 'viewing/:viewingId/reservations',
        component: ReservationsComponent,
      },
      { path: 'reservation/:movieId', component: ReservationComponent },
      { path: 'reservations', component: ReservationsComponent },
    ]),
  ],
  providers: [UserService, MovieService, ViewingService, ReservationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
