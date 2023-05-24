import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users:any;

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.apiService.getUsers().subscribe(res => this.users = res);
  }
}
