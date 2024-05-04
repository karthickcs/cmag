import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './theme/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent} from './theme/layout/auth/auth.component';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin//nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin//nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin//nav-bar/nav-right/nav-right.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component'; 
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';

import { DiffTableControllerService } from './api/diffTableController.service';
import { DpListenControllerService } from './api/dpListenController.service';
import { FileControllerService } from './api/fileController.service';
import { JwtAuthenticationControllerService } from './api/jwtAuthenticationController.service';
import { TaskControllerService } from './api/taskController.service';

 
 

@NgModule({
  declarations: [
    AppComponent,
    
    
    AuthComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    NavBarComponent,
    NavItemComponent,
    ConfigurationComponent,
    NavigationComponent,
    NavGroupComponent,
    NavContentComponent,
    NavCollapseComponent,
    AdminComponent
    
    
    
  ],
  imports: [
   
    BrowserModule,SharedModule,
    AppRoutingModule,FormsModule,HttpClientModule, NgbModule
  ],
  providers: [  DiffTableControllerService,
    DpListenControllerService,
    FileControllerService,
    JwtAuthenticationControllerService,
    TaskControllerService,NavigationItem,AuthGuardService,AuthService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
