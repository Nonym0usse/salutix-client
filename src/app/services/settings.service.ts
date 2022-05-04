import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Settings} from "../interfaces/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseURL = 'http://www.109.14.168.138:3000/settings';
  user: any;
  headers: any;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + user.stsTokenManager.accessToken,
      });
  }

  getSettings(): Observable<any> {
    return this.http.get<Settings>(`${this.baseURL}/get`, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  setSettings(data: Settings): Observable<any> {
    return this.http.patch<Settings>(this.baseURL + '/add', data, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  getDelivery(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/delivery`, { headers: this.headers }).pipe(catchError(err => { return this.errorHandler(err)}));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }
}
