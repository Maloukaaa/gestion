import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {

  username:any=localStorage.getItem("username");
  profile:any=localStorage.getItem("profiles");
  roles:any=localStorage.getItem("roles");
  constructor(private router:Router) { }

  ngOnInit() {
  }

  logOut (){
    localStorage.clear();
    this.router.navigate([""]);


  }

}
