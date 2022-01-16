import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _username$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isVisible: boolean = false;

  hide() {
    this.isVisible = false;
    this._isLoggedIn$.next(false);
  }

  show() {
    this._isLoggedIn$.next(true);
    this.isVisible = true;
  }

  getIsLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }
  setIsLoggedIn$(bool: boolean) {
    this._isLoggedIn$.next(bool);
  }
  private _headerTitle: Subject<string> = new Subject<string>();

  headerTitle() {
    return this._headerTitle;
  }
  setheaderTitle(value: string) {
    this._headerTitle.next(value);
  }

  constructor() {}
}
