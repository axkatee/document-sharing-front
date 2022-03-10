import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "@services/auth-service/auth.service";
import { FormService } from '@services/form-service/form.service';
import { DownloadService } from "@services/download-service/download.service";
import { DashboardService } from "@services/dashboard-service/dashboard.service";
import { DownloadDirective } from '@directives/download.directive';
import { SidenavMenuComponent } from '@components/sidenav-menu/sidenav-menu.component';



@NgModule({
  declarations: [
    SidenavMenuComponent,
    DownloadDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  exports: [
    SidenavMenuComponent,
    DownloadDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        DashboardService,
        AuthService,
        FormService,
        DownloadService
      ]
    }
  }
}
