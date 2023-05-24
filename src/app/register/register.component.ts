import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../validators/passwordMatch';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private apiService: ApiService){}

  success:boolean = false;
  
  registerForm = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
    pwd: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
    confirm_pwd: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]),
  }, [ passwordMatch("pwd", "confirm_pwd") ]);
  
  submit(){
    this.success = false;
    this.apiService.register(this.registerForm.value).subscribe(res => {
      this.success = true;
    })
  }
}
