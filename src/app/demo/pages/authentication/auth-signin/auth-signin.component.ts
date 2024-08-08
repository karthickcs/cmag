import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  username: any
  password: any
  constructor(private authService: AuthService , private router: Router) { }
  onSave() {
   // alert("hello")
  }

  login() {
    localStorage.setItem('token', "")
    this.authService.login(this.username, this.password).subscribe(
      (response:any) => {
      
        localStorage.setItem('token', ""+response.token)
        
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    localStorage.setItem('token', "")
  }

}
