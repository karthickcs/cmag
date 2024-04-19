import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagetaskRoutingModule } from './managetask-routing.module';
import { ManagetaskComponent } from './managetask.component';
import { SharedModule } from '../../../../theme/shared/shared.module';

 

@NgModule({
  declarations: [ManagetaskComponent],
  imports: [
    CommonModule,
    ManagetaskRoutingModule,
    SharedModule
  ]
})
export class ManagetaskModule { }
