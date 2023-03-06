import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User | null = null;
  userForm!: FormGroup;
  submitted: boolean = false;
  succeeded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      password: [''],
    });
    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user) this.userForm.patchValue(user);
    });
  }

  get form() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (!this.user?.id) return;
    this.submitted = true;
    this.userService
      .updateUser(this.user.id, this.userForm.getRawValue())
      .subscribe({
        next: () => (this.succeeded = true),
        error: () => (this.succeeded = false),
      });
  }
}
