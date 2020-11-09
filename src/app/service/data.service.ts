import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  private FusionSource = new BehaviorSubject('');
  refreshFusion = this.FusionSource.asObservable();

  private EditSource = new BehaviorSubject('');
  refreshEdit = this.EditSource.asObservable();

  private AddSource = new BehaviorSubject('');
  refreshAdd = this.AddSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }


  changeFR(message: string) {
    this.FusionSource.next(message)
  }
  
  changeER(message: string) {
    this.EditSource.next(message)
  }

  changeAdd(message: string) {
    this.AddSource.next(message)
  }
}