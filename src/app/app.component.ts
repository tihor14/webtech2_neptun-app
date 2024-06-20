import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'neptun-app';
  constructor(public authService: AuthService, 
      private router:Router,
      ){}
  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    //this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }
}
