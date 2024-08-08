import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashchartmetaRoutingModule } from './dashchartmeta-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { DashchartmetaComponent } from './dashchartmeta.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [DashchartmetaComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    DashchartmetaRoutingModule,NgApexchartsModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class DashchartmetaModule { }
