import { Component } from '@angular/core';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService: ApiService, private route: Router) { }

  signout() {
    this.apiService.logout().subscribe((res) => {
      AuthInterceptor.accessToken = '';
      localStorage.clear();
      this.route.navigate(['login']);
    })
  }
}
