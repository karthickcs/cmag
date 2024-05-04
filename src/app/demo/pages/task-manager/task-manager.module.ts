import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskManagerComponent } from './task-manager.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { AlertModule } from '../../../theme/shared/components';


@NgModule({
  declarations: [TaskManagerComponent],
  imports: [
    CommonModule,AlertModule,
    TaskManagerRoutingModule,
    SharedModule
  ]
})
export class TaskManagerModule { }
