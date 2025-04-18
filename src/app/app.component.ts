import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Blink-Angular';
  isLoading = true;

  constructor(private authService: AuthService ,private productServ:ProductService) {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  ngOnInit() {
    this.productServ.GetAll().subscribe({
     next: () => {
       this.isLoading = false;
     },
     error: (err) => {
       console.error(err);
     }
    })
    if (this.authService.isAuthenticated()) {
      this.authService.setUserRole(); 
      this.authService.userLogin();   
    }
  }
}
