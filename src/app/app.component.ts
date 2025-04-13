import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blink-Angular';

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.setUserRole(); 
      this.authService.userLogin();   
    }
  }
}
