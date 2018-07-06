import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
   imports: [
      CommonModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule
   ],
   exports: [
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule
   ]
})
export class MaterialModule {

}