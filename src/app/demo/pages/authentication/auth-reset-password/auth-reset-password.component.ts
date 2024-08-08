import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {
  username: any
  password: any
confirmpassword: any;
cpassword: any;
  constructor(private authService: AuthService , private router: Router) { }
  ngOnInit(): void {
    
  }
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

}
