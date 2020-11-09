import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-flags-menu',
  templateUrl: './flags-menu.component.html',
  styleUrls: ['./flags-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent implements OnInit {
ic:any;
 // iconss="flag-icon flag-icon-fr";
  constructor() {
    
    //document.getElementById("flagS").className=this.iconss;
   }

  ngOnInit() {
    this.ic=sessionStorage.getItem("locale");
    if(this.ic!=null && this.ic!="" && this.ic!=undefined)
    {
      if(this.ic==="fr")
      {
        document.getElementById("flagS").className="flag-icon flag-icon-fr"
       // this.iconss="flag-icon flag-icon-fr"
      }
      else if(this.ic==="en")
      {
        document.getElementById("flagS").className="flag-icon flag-icon-gb"
        //this.iconss="flag-icon flag-icon-gb";
      }
    }
    else
    {
      document.getElementById("flagS").className="flag-icon flag-icon-tn"
    }
  }
  useLanguage(language: string) {
  
    sessionStorage.setItem("locale", language);
    
     parent.document.location.reload();
 }
}
