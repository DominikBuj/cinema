import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserService } from './services/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewingsComponent } from './components/viewings/viewings.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieService } from './services/movie.service';

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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: ViewingsComponent, pathMatch: 'full' },
      { path: 'viewings', component: ViewingsComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movie/:id', component: MovieComponent },
    ]),
  ],
  providers: [UserService, MovieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
