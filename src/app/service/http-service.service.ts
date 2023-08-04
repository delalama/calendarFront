import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ScheduleData} from "../interface/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  localhost = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(this.localhost + endpoint);
  }

  post(endpoint: string, body: any): Observable<ScheduleData> {
    return this.http.post<ScheduleData>(this.localhost + endpoint, body);
  }

  postReturnString(endpoint: string, body: any): Observable<string> {
    return this.http.post<string>(this.localhost + endpoint, body);
  }
}
