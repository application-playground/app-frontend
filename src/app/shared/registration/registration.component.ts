import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuhenticationService } from 'src/app/services/auhentication.service';
import { UserService } from 'src/app/services/user.service';
declare var jQuery:any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuhenticationService,
    private userService: UserService,
    // private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                //this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                //this.alertService.error(error);
                this.loading = false;
            });
}

  ngAfterViewInit() {

    jQuery(document).ready(function(){
      jQuery('.i-checks').iCheck({
          checkboxClass: 'icheckbox_square-green',
          radioClass: 'iradio_square-green',
      });
  });

  }

}
