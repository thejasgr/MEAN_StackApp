import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isEmpty = true;
  total=[];

  cartItems;
  grandTotal =0;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getCart().subscribe(
      res => {
        this.cartItems = res;
        console.log(res);
        for (let i = 0; i < this.cartItems.length; i++) {
          this.total[i] = this.cartItems[i].total+this.cartItems[i].addOnPrice;
          this.grandTotal += this.cartItems[i].total+this.cartItems[i].addOnPrice;
        }
      }
    );
  }
  removeFromCart(_id) {
    this.httpService.removeCartData(_id).subscribe(res => {
      console.log(res);
    });
  }

}

