import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskManagerComponent } from './task-manager.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { AlertModule } from '../../../theme/shared/components';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [TaskManagerComponent],
  imports: [
    CommonModule,AlertModule,MatTooltipModule,MatButtonModule,MatIconModule,
    TaskManagerRoutingModule,
    SharedModule
  ]
})
export class TaskManagerModule { }
