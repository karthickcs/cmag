import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranviewRoutingModule } from './tranview-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { TranviewComponent } from './tranview.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [TranviewComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    TranviewRoutingModule,MatIconModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class TranviewModule { }
