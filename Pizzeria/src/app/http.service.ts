import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  addToCart(pizzaid, ingredients, addOnPrice, total) {
    return this.httpclient.post(this.url + 'addToCart', { 'id': pizzaid, 'topping': ingredients, 'addOnPrice': addOnPrice, 'total': total });
  }
  getCart() {
    return this.httpclient.get(this.url + 'getCart');
  }

  removeCartData(id){
    return this.httpclient.post(this.url+"removeFromCart",{"_id":id},{headers: new HttpHeaders ().set('Content-Type','application/json')});
   }
}
