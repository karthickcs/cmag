import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
logout() {
  this.authservice.logout();
  this.router.navigate(['/auth/signin']);
}
  user: any;

  constructor(private authservice: AuthService,private router: Router ) { }

  ngOnInit() { 

    this.user= this.authservice.currentUser();
  }
}
