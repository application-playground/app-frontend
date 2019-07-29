import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuhenticationService } from 'src/app/services/auhentication.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  termsConditions = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuhenticationService,
    private userService: UserService,
    private alertService: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      termsConditions: [false]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(ev: Event) {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value)
      .subscribe(
        data => {
          if (data['status']) {
            this.router.navigate(['/login']);
            this.alertService.success(data['message'], data['user']['email']);
            this.loading = false;
          } else {
            this.alertService.error(data['message'], data['user']['email']);
            this.loading = false;
          }
        },
        error => {
          this.alertService.error('something went wrong!!','Administrator');
          this.loading = false;
        });
  }

  ngAfterViewInit() {

    jQuery(document).ready(function () {
      jQuery('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
      });
    });

  }
}
