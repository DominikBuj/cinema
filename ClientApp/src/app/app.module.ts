import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserService } from './services/user.service';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewingsComponent } from './components/viewings/viewings.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieService } from './services/movie.service';
import { ViewingComponent } from './components/viewing/viewing.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ViewingService } from './services/viewing.service';
import { ReservationService } from './services/reservation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SignUpComponent,
    SignInComponent,
    ViewingsComponent,
    ProfileComponent,
    MoviesComponent,
    MovieComponent,
    ViewingComponent,
    ReservationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatStepperModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: ViewingsComponent, pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movie/:id', component: MovieComponent },
      { path: 'viewings', component: ViewingsComponent },
      { path: 'viewing/:id', component: ViewingComponent },
      { path: 'reservation/:movieId', component: ReservationComponent },
    ]),
  ],
  providers: [UserService, MovieService, ViewingService, ReservationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
