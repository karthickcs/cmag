import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewwindtransacRoutingModule } from './viewwindtransac-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { ViewwindtransacComponent } from './viewwindtransac.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewwindtransacComponent ],
  imports: [
    CommonModule,AlertModule,
    ViewwindtransacRoutingModule,MatTooltipModule,MatButtonModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ViewwindtransacModule { }
