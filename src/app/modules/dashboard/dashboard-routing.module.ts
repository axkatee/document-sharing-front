import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { TextFileContentComponent } from "@components/text-file-content/text-file-content.component";


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: ':folderId/:fileId',
    component: TextFileContentComponent
  },
  {
    path: ':folderId',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
