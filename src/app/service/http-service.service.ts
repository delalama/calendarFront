import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  localhost = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(this.localhost + endpoint);
  }

  post(endpoint: string, body: any) {
    return this.http.post(this.localhost + endpoint, body);
  }
}
