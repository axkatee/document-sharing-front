import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "@services/auth-service/auth.service";
import { FormService } from '@services/form-service/form.service';
import { DashboardService } from "@services/dashboard-service/dashboard.service";
import { SidenavMenuComponent } from '@components/sidenav-menu/sidenav-menu.component';



@NgModule({
  declarations: [
    SidenavMenuComponent

  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  exports: [
    SidenavMenuComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        DashboardService,
        AuthService,
        FormService
      ]
    }
  }
}
