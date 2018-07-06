import { Injectable } from "@angular/core";
import swal from 'sweetalert';
import { StageDecoratorParams, FlextErrorStage } from './../../../projects/flext/public_api';

@Injectable()
export class FlextStagesService {

   @FlextErrorStage()
   onError(params: StageDecoratorParams) {
      let {instanceRef, stageValue: error, payload = {}} = params;
      console.log('error', error);
      swal(error);
   }

}