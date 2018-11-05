import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isEmpty = true;
  total=[];

  cartItems= new Array();
  grandTotal =0;

  constructor(private httpService: HttpService,private toast:MatSnackBar,private route:Router) { }

  ngOnInit() {
    this.httpService.getCart().subscribe(
      (res:[]) => {
        this.cartItems = res;
        for (let i = 0; i < this.cartItems.length; i++) {
          this.total[i] = this.cartItems[i].total+this.cartItems[i].addOnPrice;
          this.grandTotal += this.cartItems[i].total+this.cartItems[i].addOnPrice;
        }if(this.cartItems.length!=0){
          this.isEmpty=false;
        }
        
      }
    );
  }
  removeFromCart(_id) {
    this.httpService.removeCartData(_id).subscribe(res => {
      this.toast.open('Item Deleted', '', { duration: 3000 });
    });
  }

  change(){
this.route.navigate(['OrderPizza']);
  }

}

