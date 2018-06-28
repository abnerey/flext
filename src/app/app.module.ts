import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';
import { FlextModule } from 'projects/flext/public_api';
import { FlextStagesService } from './shared/flext-stages.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorHandlingComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    FlextModule.forRoot([FlextStagesService])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
