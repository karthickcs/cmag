import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskManagerComponent } from './task-manager.component';
import {SharedModule} from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [TaskManagerComponent],
  imports: [
    CommonModule,
    TaskManagerRoutingModule,
    SharedModule
  ]
})
export class TaskManagerModule { }
