import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewwindnaRoutingModule } from './viewwindna-routing.module';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { ViewwindnaComponent } from './viewwindna.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { AlertModule } from '../../../../theme/shared/components';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewwindnaComponent ],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,
    ViewwindnaRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class ViewwindnaModule { }
