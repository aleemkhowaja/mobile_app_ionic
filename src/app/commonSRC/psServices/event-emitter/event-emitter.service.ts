import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  @Output() public onDirectionClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onSwipe: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onSelectBranch: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onSelectSegment: EventEmitter<any> = new EventEmitter<any>();

  
  private schedulerObjLoaded = new Subject();
  schedulerObjLoadedPromise = this.schedulerObjLoaded.asObservable();


  emitDirectionChangeEvent(value) {
    this.onDirectionClick.emit(value);
  }
  getDirectionChangeEmitter() {
    return this.onDirectionClick;
  }
  emitSwipeChangeEvent(value) {
    this.onSwipe.emit(value);
  }
  getSwipeChangeEmitter() {
    return this.onSwipe;
  }
  emitSelectBranchEvent(value) {
    this.onSelectBranch.emit(value);
  }
  getSelectBranchEmitter() {
    return this.onSelectBranch;
  }
  emitSelectSegmentEvent(value) {
    this.onSelectSegment.emit(value);
  }
  getSelectSegmentEmitter() {
    return this.onSelectSegment;
  }

  setSchedulerObjLoaded(value) {
    this.schedulerObjLoaded.next(value);
  }
}
