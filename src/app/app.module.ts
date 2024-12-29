import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/nav-bar/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi   } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { InterceptorService } from './services/interceptor.service';
import { NgApexchartsModule } from 'ng-apexcharts';

import { provideNgSimpleState } from 'ng-simple-state';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent,
    ConfigurationComponent,
    GuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    NgApexchartsModule,
  ],
  providers: [
    NavigationItem,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    provideNgSimpleState({
      enableDevTool: isDevMode(),
      enableLocalStorage: true,
      persistentStorage: 'local'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
