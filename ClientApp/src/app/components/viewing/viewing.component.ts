import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Viewing } from 'src/app/models/viewing.model';
import { ViewingService } from 'src/app/services/viewing.service';

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: ['./viewing.component.css']
})
export class ViewingComponent implements OnInit {
  routeSubscription!: Subscription;
  id: number | null = null;
  viewingForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private viewingservice: ViewingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.viewingForm = this.formBuilder.group({
    });
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

  onSubmit() {
    this.submitted = true;
    if (this.viewingForm.invalid) return;
    const viewing: Viewing = this.viewingForm.getRawValue();
    // if (!!this.id) movie.id = this.id;
    // this.movieService.addMovie(movie).subscribe({
    //   next: () => this.router.navigate(['/movies']),
    //   error: (error) => console.log('error'),
    // });
  }
}
