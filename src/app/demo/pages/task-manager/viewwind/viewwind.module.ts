import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewwindRoutingModule } from './viewwind-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { ViewwindComponent } from './viewwind.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewwindComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    ViewwindRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ViewwindModule { }
