import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashchartdesRoutingModule } from './dashchartdes-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { DashchartdesComponent } from './dashchartdes.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [DashchartdesComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    DashchartdesRoutingModule,NgApexchartsModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class DashchartdesModule { }
