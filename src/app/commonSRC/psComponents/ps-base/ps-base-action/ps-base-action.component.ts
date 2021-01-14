import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggerService } from '../../../psServices/logger/logger.service';
import { IOptionsPsBaseAction } from '../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../psServices/ps-common/ps-common.service';
import { PsBaseComponent } from '../ps-base.component';


@Component({
  selector: 'ps-base-action',
  templateUrl: './ps-base-action.component.html',
  styleUrls: ['./ps-base-action.component.scss'],
})
export class PsBaseActionComponent extends PsBaseComponent implements OnInit {
  @Input() options: IOptionsPsBaseAction = {};
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(common: PsCommonService, loggerP: LoggerService, elRefBaseAction?: ElementRef) {
    super(common, loggerP, elRefBaseAction);
  }

  preCallFunctionCall() {
    return new Promise<any>((resolve, reject) => {
      if (this.options.preCallFunction && this.options.preCallFunction.executionClass) {
        this.options.preCallFunction.params = this.options.preCallFunction.params ? this.options.preCallFunction.params : [{}];
        this.options.preCallFunction.func(...this.options.preCallFunction.params).then((preCallResult) => {
          resolve(preCallResult);
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve(null);
      }
    });
  }

  postCallFunctionCall(response?) {
    return new Promise<any>((resolve, reject) => {
      this.callExtendedFunctions('postCallFunction', response).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }


  failureCallFunctionCall(response?) {
    return new Promise<any>((resolve, reject) => {
      this.callExtendedFunctions('failureCallFunction', response).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }



  callExtendedFunctions(functionName: string, data?) {
    return new Promise<any>((resolve, reject) => {
      if (this.options[functionName] && this.options[functionName].executionClass) {
        this.options[functionName].params = this.options[functionName].params ? this.options[functionName].params : [{}];
        const index = this.options[functionName].params.indexOf(this.options[functionName].executionClass);
        /** Added by Hisham.Omar TP# 1128501 start
         * Put the old params in temporary variable
         * Check if the execution class exists
         * If yes, set the new response data
         */
        const tempParam = [...this.options[functionName].params];

        if (index >= 0 && data) {
          tempParam[index] = JSON.parse(JSON.stringify(data));
        }
        this.options[functionName].func(...tempParam).then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
        /** Added by Hisham.Omar TP#1128501 end */
      } else {
        resolve(null);
      }
    });
  }
  onClicked() {
    this.onClick.emit();
  }
}
