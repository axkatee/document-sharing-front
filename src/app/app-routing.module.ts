import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@config';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
