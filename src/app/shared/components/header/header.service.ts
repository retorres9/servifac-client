import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerTitle: Subject<string> = new Subject<string>();

  headerTitle() {
    return this._headerTitle;
  }
  setheaderTitle(value: string) {
    this._headerTitle .next(value);
  }

  constructor() {}
}
