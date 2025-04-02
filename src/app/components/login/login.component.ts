import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  msgerror: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  login(): void {
    console.log("Login function triggered!"); 
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData = {
        emial: this.loginForm.value.identifier,  
        password: this.loginForm.value.password
      };
  
      console.log("Sending login data:", loginData); 
  
  
      this._AuthService.login(loginData).subscribe({
        next: (response) => {
          console.log("Login Response:", response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.isLoading = false;
            this._Router.navigateByUrl('/Homepage');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.log("Login Error:", err);
          this.msgerror = err.error?.message || "Login failed. Please try again.";
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
