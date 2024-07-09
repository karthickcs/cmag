import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NextConfig} from '../../../../app-config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
onmincl() {
  this.onmin.emit();
}
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();
  @Output() onmin = new EventEmitter();
  constructor() {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() { 
     
  }

  navMobCollapse() {
    
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }
}
