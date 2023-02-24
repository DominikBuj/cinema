import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.signInForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signInForm.invalid) return;
    this.userService.signIn(this.signInForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigateByUrl(
          this.route.snapshot.queryParams.returnUrl || ''
        );
      },
      error: (error) => {
        this.snackBar.open('Sign in failed', undefined, {
          duration: 2000,
        });
      },
    });
  }
}
