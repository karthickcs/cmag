import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../alert/alert.module';
 
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule,AlertModule
  ],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
