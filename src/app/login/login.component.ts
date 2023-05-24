import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private apiService: ApiService, private route: Router) { }

  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    pwd: new FormControl('', Validators.required),
    persist: new FormControl(false)
  });

  error: any;

  submit() {
    if (this.loginForm.value.persist) {
      localStorage.setItem('persist', 'true');
    }

    this.apiService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        AuthInterceptor.accessToken = response.accessToken;
        this.route.navigate(['home']);
      },
      error: (e) => {
        // TypeError: You provided 'undefined' where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.
        this.error = e;
      },
    })
  }


}


/*
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private apiService: ApiService, private route: Router) { }

  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    pwd: new FormControl('', Validators.required),
    persist: new FormControl(false)
  });

  submit() {

    if (this.loginForm.value.persist) {
      localStorage.setItem('persist', 'true');
    }

    this.apiService.login(this.loginForm.value).subscribe((response: any) => {
      console.log('login response', response);
      AuthInterceptor.accessToken = response.accessToken;
      this.route.navigate(['home']);
    })
  }
}

*/