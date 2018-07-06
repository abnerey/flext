import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ErrorHandlingComponent } from '../components/error-handling/error-handling.component';

export const routes: Routes = [
   { path: '', redirectTo: 'error', pathMatch: 'full'},
   { path: 'error', component: ErrorHandlingComponent }
]

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class RoutingModule {

}
