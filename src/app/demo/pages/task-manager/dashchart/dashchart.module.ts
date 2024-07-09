import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashchartRoutingModule } from './dashchart-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { DashchartComponent } from './dashchart.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [DashchartComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    DashchartRoutingModule,NgApexchartsModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class DashchartModule { }
