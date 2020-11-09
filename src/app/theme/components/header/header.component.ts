import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { trigger,  state,  style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import deMessages from 'devextreme/dist/js/localization/dx.messages.fr.js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ],
  animations: [
    trigger('showInfo', [
      state('1' , style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public showHorizontalMenu:boolean = true; 
  public showInfoContent:boolean = false;
  public settings: Settings;
  public menuItems:Array<any>;
  public myAppVersionNumberBack: string="0";
  public myAppVersionNumberFront: string="Version: 0";
  public username;
  constructor(public appSettings:AppSettings, public menuService:MenuService,private router:Router) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getHorizontalMenuItems();
           // this.myAppVersionNumberFront=""
           this.myAppVersionNumberFront+="."+this.myAppVersionNumberBack;
         //  this.username=sessionStorage.getItem("username");
  }
  
  ngOnInit() {
    if(window.innerWidth <= 768) 
      this.showHorizontalMenu = false;
  }
  useLanguage(language: string) {
  
    sessionStorage.setItem("locale", language);
     parent.document.location.reload();
 }

  public closeSubMenus(){
    let menu = document.querySelector("#menu0"); 
    if(menu){
      for (let i = 0; i < menu.children.length; i++) {
          let child = menu.children[i].children[1];
          if(child){          
              if(child.classList.contains('show')){            
                child.classList.remove('show');
                menu.children[i].children[0].classList.add('collapsed'); 
              }             
          }
      }
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
     if(window.innerWidth <= 768){
        this.showHorizontalMenu = false;
     }      
      else{
        this.showHorizontalMenu = true;
      }
  }
  

  logOut (){
    localStorage.clear();
    this.router.navigate([""]);


  }

}
