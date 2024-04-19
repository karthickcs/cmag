import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatetaskRoutingModule } from './createtask-routing.module';
import { CreatetaskComponent } from './createtask.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
 

@NgModule({
  declarations: [CreatetaskComponent],
  imports: [
    CommonModule,
    CreatetaskRoutingModule,
    SharedModule
  ]
})
export class CreatetaskModule { }
