import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'
import { HttpService } from '../http.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {
  formDetails: FormGroup;
  flag:any;
  status:boolean=true;

  constructor(private httpService: HttpService, private router:Router) {
    this.formDetails = new FormGroup({
      userID: new FormControl(),
      password: new FormControl(),
    });
   }

  ngOnInit() {
  }

  validate(value) {
    console.log(value.userID)
    
    this.httpService.validate(value).subscribe(res => {
      this.flag= res;
      if(this.flag.status == true){
        this.status=false;
        this.router.navigateByUrl("navbar");

      }
    });
  }

}
