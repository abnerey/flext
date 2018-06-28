import { Component } from "@angular/core";
import { FlextException } from "projects/flext/public_api";

@Component({
   selector: 'app-error-handling',
   templateUrl: './error-handling.component.html',
   styleUrls: ['./error-handling.component.scss']
})
export class ErrorHandlingComponent {

   @FlextException()
   onClick() {
      throw 'Error happens!';
   }

}
