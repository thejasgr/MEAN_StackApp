import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://localhost:3000/';
  constructor(private httpclient: HttpClient) { }
  getpizzainfo() {
    return this.httpclient.get(this.url + 'getpizza');

  }
  getingredientsinfo() {
    return this.httpclient.get(this.url + 'getingredients');
  }
}