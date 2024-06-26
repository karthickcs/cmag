import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(protected alertService: AlertService) { }
  options = {
    autoClose: false,
    keepAfterRouteChange: false
};

  ngOnInit(): void {
  }

}
