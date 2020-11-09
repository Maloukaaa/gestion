import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import {TranslateService} from '@ngx-translate/core';
import { BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DxDataGridModule,DxBulletModule,DxTemplateModule } from 'devextreme-angular';
  import  * as defaultLanguage from "../assets/i18n/fr.json" ;
  import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import deMessages from 'devextreme/dist/js/localization/dx.messages.fr.js';
import {arLocale,frLocale ,listLocales, defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('fr', frLocale);
defineLocale('ar', arLocale);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public settings: Settings;
  locale: string;
  locales = 'en';
  locales1 = listLocales();
  
    constructor(public appSettings:AppSettings, private router:Router,private translate: TranslateService,private localeService: BsLocaleService){
        this.settings = this.appSettings.settings;  
   
 
    loadMessages(deMessages);
    this.locale=sessionStorage.getItem("locale");
    if(this.locale!="" && this.locale!=null && this.locale!=undefined){
 
    locale(this.locale);
    translate.use(this.locale);
    this.localeService.use(this.locale);
  }
  else{
    locale("fr");
   // translate.use("fr");
    this.localeService.use("fr");
  }
 
    }

    useLanguage(language: string) {
  
      sessionStorage.setItem("locale", language);
       parent.document.location.reload();
   }
   ngAfterViewInit(){

    setInterval(()=>{ 
      
      var m=new Date().getMinutes();
      var h=new Date().getHours();
      var ss=new Date().getSeconds();
      var loginDate=new Date(localStorage.getItem("time"));

var minutes=loginDate.getMinutes();
var hours=loginDate.getHours();
var seconds=loginDate.getSeconds();
if(hours+12>23){
  hours=(hours+12)-24;
 
}
else{

  hours=loginDate.getHours()+12;
 
}
      if(h==hours && minutes==m && ss==seconds)
      {
        localStorage.clear();
        this.router.navigate([""])
      }
      
    
    
    },1000)



    if(this.locale!="" && this.locale!=null && this.locale!=undefined){
    
      locale(this.locale);
      this.translate.use(this.locale);
      this.localeService.use(this.locale);
    }
    else{
      locale("fr");
     this.translate.use("fr");
      this.localeService.use("fr");
    }
             
  }
   
}
