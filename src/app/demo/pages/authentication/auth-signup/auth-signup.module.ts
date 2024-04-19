import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthSignupRoutingModule,FormsModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
