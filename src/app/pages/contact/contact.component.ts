import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { filter, map, catchError } from 'rxjs/operators';
import { Contact } from "../../Contact";
import { ContactService } from '../service/contact.service';
import { NotifierService, NotifierOptions } from "angular-notifier";
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Subscription, throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';






import { registerLocaleData } from '@angular/common';
import { DxPopupModule } from "devextreme-angular";
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import 'devextreme-intl';
import { Router } from '@angular/router';
//import { locale, loadMessages, formatMessage } from 'devextreme/localization';
//import deMessages from 'devextreme/dist/js/localization/dx.messages.fr.js';

import { HttpClient, HttpParams } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ImportModalComponent } from 'src/app/import-modal/import-modal.component';
import { LoginComponent } from '../login/login.component';
import { FusionContactComponent } from 'src/app/fusion-contact/fusion-contact.component';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2'
const ITEMS_PER_PAGE =20;

export class filterH{
  text:String;
  value:any;

}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})



export class ContactComponent implements OnInit {
  parentMessage = "message from parent";
public dataSource;
popupVisible: boolean = false;
contacts: Contact[];
itemsPerPage: number;
eventSubscriber: Subscription;
ListeO:any[];
ListeT:filterH[];
ListeS:any[];
model2;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;
  maxID:number;
 currentDate :Date = new Date()
   day = this.currentDate.getUTCDate();deletedC: Contact;
  gridElement: any;
  btnExportInstance: any;
  EditState: string;




 month = this.currentDate.getMonth();
   year = this.currentDate.getFullYear()
   locale: string;
   today= {
    "year": this.year,
    "month": this.month,
    "day": this.day
  }
  @ViewChild(ImportModalComponent, {static: false}) importModule: ImportModalComponent;
  //@ViewChild(FusionContactComponent, {static: false}) fcc: FusionContactComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  canFusion():Boolean{
    return true;
  /*
    try{
      let t=localStorage.getItem("roles").split(",");
      
    
     
      
      let cpt:any=0;
     
     
      for(var  i=0;i<t.length;i++)
        {
          
          if(t[i]=="canFusionContact" )
          {
            cpt=cpt+1;
          }
        }
      
       
       
        if(cpt>0)
        {
          
         return true;
        }
       else 
        {
          return false;
          }
    
      
        }catch(e)
        {
    
        }
     */
  
  
  }
 
  onToolbarPreparing(e) {

    if(this.canFusion()){

      this.translate.get("CM.fusion").subscribe((res) => {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: res,
                    icon: 'fa fa-users',
                    onClick: this.fusion.bind(this),
                    disabled:true,
                    onInitialized: (args: any) => {
                      this.btnExportInstance = args.component;
                    },
                }
            })
      })
    
    }
    
    this.translate.get("CM.rafraichir").subscribe((res) => {
      e.toolbarOptions.items.unshift(
          {
              location: 'after',
              widget: 'dxButton',
              options: {
                  hint: res,
                  icon: 'refresh',
                  onClick: this.refreshtest.bind(this),
              }
          })
    })  

    if(this.canAdd() && this.canImport()){

      this.translate.get("CM.import").subscribe((res) => {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: res,
                    icon: 'fa fa-upload',
                    onClick: this.openModal.bind(this),
                }
            })
    })
  }    


  if(this.canAdd() ){

    this.translate.get("CM.create").subscribe((res) => {
      e.toolbarOptions.items.unshift(
          {
              location: 'after',
              widget: 'dxButton',
              options: {
                  hint: res,
                  icon: 'add',
                  onClick: this.ouvrir.bind(this),
              }
          })
  })
}  


      



}

    ouvrir(e)
    {
       // window.open('ajout-contact');
       this.router.navigate(["/ajout-contact"])
    }
   public goEdit(e,id)
    {
      setTimeout(()=>{
        this.router.navigate(["/edit-contact/"+id])
      },1000)
     
    }

    public goShow(e,id)
    {
      this.router.navigate(["/show-contact/"+id])
    }

    
   /* useLanguage(language: string) {
  
     sessionStorage.setItem("locale", language);
      parent.document.location.reload();
  }
*/
refreshDataGrid() {
  this.dataGrid.instance.refresh();
}


selectedRowsData = [];
contentReady(e) {
  /* if (!e.component.getSelectedRowKeys().length)
       e.component.selectRowsByIndexes(0);
 */

}
currentVisible = true;
selectedRowsId=[];
selectionChanged(e) {
  
  
  if(this.canFusion()){

    e.component.getSelectedRowKeys().then((selectedRowsData) => {
  
     
      this.selectedRowsId=selectedRowsData;
     
      
    if(this.selectedRowsId.length>1){
     setTimeout(()=>{
      this.btnExportInstance.option({
        disabled: false
      });

     },2000)
      
    }
     else
     {
      
      this.btnExportInstance.option({
        disabled: true
      });
     }
      
    });
  }

  
  
  }
  

fusion(e)
{


  setTimeout(()=>{


    this.data.changeMessage(this.selectedRowsId.toString());
    this.router.navigate(["/fusion-contact"])

  },2000)
 
 
}
message:string;
openModal(e){

       this.importModule.openModal();
  this.dataGrid.instance.refresh();
  
    }

allMode: string;
    checkBoxesMode: string;
  constructor( private data: DataService,protected contactService: ContactService,private translate: TranslateService, private router:Router, private http:HttpClient) {
    this.allMode = 'allPages';

    this.contacts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
    


  
  // Malek partie 


 


 /* this.dataSource = new CustomStore({
    key: "id",
    load: function (loadOptions: any) {
      let total;
  
    
   
   
        var params = "";

        if(loadOptions.take==undefined && loadOptions.skip==undefined){
        
         params += '&size=' +localStorage.getItem("total");
          params += '&from=' ;
        
        }
        else
        {
         
          params += '&size=' + loadOptions.take || 5;
          params += '&from=' + loadOptions.skip || 0;
        }
       
      
     
        if (loadOptions.sort) {
       
            if (loadOptions.sort[0].desc) {
                if ((loadOptions.sort[0].selector == "datePContact")  || (loadOptions.sort[0].selector == "id") || (loadOptions.sort[0].selector == "codePostal") )
                    params += '&sort=' + loadOptions.sort[0].selector + ':desc';

                else if ((loadOptions.sort[0].selector == "dateCreated")  || (loadOptions.sort[0].selector == "id") || (loadOptions.sort[0].selector == "codePostal") )
                    params += '&sort=' + loadOptions.sort[0].selector + ':desc';
                else if ((loadOptions.sort[0].selector == "dateUpdate")  || (loadOptions.sort[0].selector == "id") || (loadOptions.sort[0].selector == "codePostal") )
                    params += '&sort=' + loadOptions.sort[0].selector + ':desc';
                else
                    params += '&sort=' + loadOptions.sort[0].selector + '.keyword:desc';
            }
            else if ((loadOptions.sort[0].selector == "datePContact")  || (loadOptions.sort[0].selector == "id") || (loadOptions.sort[0].selector == "codePostal") )
                params += '&sort=' + loadOptions.sort[0].selector + ':asc';
            else if ((loadOptions.sort[0].selector == "dateCreated")  || (loadOptions.sort[0].selector == "id") || (loadOptions.sort[0].selector == "codePostal") )
                params += '&sort=' + loadOptions.sort[0].selector + ':asc';
            else if ((loadOptions.sort[0].selector == "dateUpdate")  || (loadOptions.sort[0].selector == "id") || (loadOptions.sort[0].selector == "codePostal") )
                params += '&sort=' + loadOptions.sort[0].selector + ':asc';
            else
                params += '&sort=' + loadOptions.sort[0].selector + '.keyword:asc';
        }
        else {
            params += '&sort=id:asc';
        }
        let tab: any[] = [];
        let tabOR: any[] = [];
        if (loadOptions.filter) {
          
            if (loadOptions.filter[1] == 'and') {
            
                for (var i = 0; i < loadOptions.filter.length; i++) {
                    if (loadOptions.filter[i][1] == 'and') {
                     
                        for (var j = 0; j < loadOptions.filter[i].length; j++) {
                            if (loadOptions.filter[i][j] != 'and') {
                             
                                if (loadOptions.filter[i][j][1] == 'and') {
                                 
                                    tab.push(loadOptions.filter[i][j][0]);
                                    tab.push(loadOptions.filter[i][j][2]);
                                }
                                else if (loadOptions.filter[i][j][1] == 'or') {
                                 
                                    tabOR.push(loadOptions.filter[i][j][0]);
                                    tabOR.push(loadOptions.filter[i][j][2]);
                                }
                                else
                               
                                    tab.push(loadOptions.filter[i][j]);
                            }
                        }
                    }
                    else if (loadOptions.filter[i][1] == 'or') {
                     
                        for (var j = 0; j < loadOptions.filter[i].length; j++) {
                            if (loadOptions.filter[i][j] != 'or') {
                             
                                tabOR.push(loadOptions.filter[i][j]);
                            }
                        }
                    }
                    else tab.push(loadOptions.filter[i]);
                }
            }
            else if (loadOptions.filter[1] == 'or') {
             
             
                for (var i = 0; i < loadOptions.filter.length; i++)
                {
                 
                  if (loadOptions.filter[i] != 'or')
                  {
                    let s:string=loadOptions.filter[i];
                   
                      if(s[0].length>2 && s[0].indexOf('or') !=-1)
                      {
                        
                          
                          for(var ij=0;ij<s[0].length;ij++)
                          {
                           
                            if(s[0][ij]!='or')
                            {
                              tabOR.push(s[0][ij]);
                            }
                          }
                      }
                      else if(s[0].length==2 && s[0].indexOf('or')==-1){
                        tabOR.push(loadOptions.filter[i]);
                      }
                      
                    
                  }
                  else
                  {
                    
                    tabOR.push(loadOptions.filter[i]);
                  }
                 

                }
                   
            }
            else{
              
              tab.push([loadOptions.filter[0], loadOptions.filter[1], loadOptions.filter[2]]);
            }
                
        }
  
  
        let q: any[] = [];
        let reqRechercher: any[] = [];
        let reqRechercherAnd: any[] = [];
        for (let i = 0; i < tab.length; i++) {
            switch (tab[i][1]) {
                case ('notcontains'): {
                    q.push("!(" + tab[i][0] + ":*" + tab[i][2] + "*" + ")");
                    break;
                }
                case  'contains': {
                    q.push("(" + tab[i][0] + ":*" + tab[i][2] + "*" + ")");
                    break;
                }
                case '<>' : {
                  
                    q.push("!(" + tab[i][0] + ":" + tab[i][2] + ")");
                    break;
                }
                case  '=': {
                    q.push("(" + tab[i][0] + ":" + tab[i][2] + ")");
                    break;
                }
                case 'endswith': {
                    q.push("(" + tab[i][0] + ":*" + tab[i][2] + ")");
                    break;
                }
                case  'startswith': {
                    q.push("(" + tab[i][0] + ":" + tab[i][2] + "*" + ")");
                    break;
                }
                case  '>=': {
                    q.push('(' + tab[i][0] + ':[' + tab[i][2] + '+TO+ * ])');
                    break;
                }
                case  '>': {
                    if (tab[i][0] == "num") q.push('(' + tab[i][0] + ':[' + (parseInt(tab[i][2], 10) + 1) + '+TO+ * ])');
                    else q.push('(' + tab[i][0] + ':[' + tab[i][2] + '+TO+ * ])');
                    break;
                }
                case  '<=': {
                    q.push('(' + tab[i][0] + ':[ *' + '+TO+ ' + tab[i][2] + '])');
                    break;
                }
                case  '<': {
                    if (tab[i][0] == "num") q.push('(' + tab[i][0] + ':[ *' + '+TO+ ' + (parseInt(tab[i][2], 10) - 1) + '])');
                    else q.push('(' + tab[i][0] + ':[ *' + '+TO+ ' + tab[i][2] + '])');
                    break;
                }
                case "or" : {
                    q.push('((' + tab[i][0][0] + ':[ * +TO+' + tab[i][0][2] + ']) OR (' + tab[i][2][0] + ':[' + tab[i][2][2] + '+TO+ * ]))')
                    break;
                }
                case "and" : {
              
                    q.push('((' + tab[i][0][0] + ':[ ' + tab[i][0][2] + '+TO+ * ]) AND (' + tab[i][2][0] + ':[ * +TO+ ' + tab[i][2][2] + ']))')
                    break;
                }
  
            }
        }
  
  
        for (let i = 0; i < tabOR.length; i++) {
            switch (tabOR[i][1]) {
                case ('notcontains'): {
                    reqRechercher.push("!(" + tabOR[i][0] + ":*" + tabOR[i][2] + "*" + ")");
                    break;
                }
                case  'contains': {
                    reqRechercher.push("(" + tabOR[i][0] + ":*" + tabOR[i][2] + "*" + ")");
                    break;
                }
                case '<>' : { 
                 
                    reqRechercher.push("!(" + tabOR[i][0] + ":" + tabOR[i][2] + ")");
                    break;
                }
                case  '=': {
                    reqRechercher.push("(" + tabOR[i][0] + ":" + tabOR[i][2] + ")");
                    break;
                }
                case 'endswith': {
                    reqRechercher.push("(" + tabOR[i][0] + ":*" + tabOR[i][2] + ")");
                    break;
                }
                case  'startswith': {
                    reqRechercher.push("(" + tabOR[i][0] + ":" + tabOR[i][2] + "*" + ")");
                    break;
                }
                case  '>=': {
                    reqRechercher.push('(' + tabOR[i][0] + ':[' + tabOR[i][2] + '+TO+ * ])');
                    break;
                }
                case  '>': {
                    if (tabOR[i][0] == "num") reqRechercher.push('(' + tabOR[i][0] + ':[' + (parseInt(tabOR[i][2], 10) + 1) + '+TO+ * ])');
                    else reqRechercher.push('(' + tabOR[i][0] + ':[' + tabOR[i][2] + '+TO+ * ])');
                    break;
                }
                case  '<=': {
                    reqRechercher.push('(' + tabOR[i][0] + ':[ *' + '+TO+ ' + tabOR[i][2] + '])');
                    break;
                }
                case  '<': {
                    if (tabOR[i][0] == "num") reqRechercher.push('(' + tabOR[i][0] + ':[ *' + '+TO+ ' + (parseInt(tabOR[i][2], 10) - 1) + '])');
                    else reqRechercher.push('(' + tabOR[i][0] + ':[ *' + '+TO+ ' + tabOR[i][2] + '])');
                    break;
                }
                case "or" : {
                    reqRechercher.push('((' + tabOR[i][0][0] + ':[ * +TO+' + tabOR[i][0][2] + ']) OR (' + tabOR[i][2][0] + ':[' + tabOR[i][2][2] + '+TO+ * ]))')
                    break;
                }
                case "and" : {
                 
                  if(tabOR[i][2][2]!=undefined) {
                    reqRechercher.push('((' + tabOR[i][0][0] + ':[ ' + tabOR[i][0][2] + '+TO+ * ]) AND (' + tabOR[i][2][0] + ':[ * +TO+ ' + tabOR[i][2][2] + ']))')
                    break;
                  }
                   else
                   {
                     
                    reqRechercher.push('((' + tabOR[i][0][0] + ':[ ' + tabOR[i][0][2] + '+TO+ * ])')
                    break;
                   }
                }
  
            }
        }
        let f: string = "";
  
        if (q.length != 0) f += '(((is_active:true)) AND (' + q[0];
        for (let i = 1; i < q.length; i++) {
            f += " AND " + q[i];
           
        }
        if (q.length != 0) f += '))';
        if ((f != "") && reqRechercher.length != 0) f += "AND"
        if (reqRechercher.length != 0) f += '(((is_active:true)) AND (' + reqRechercher[0];
       
        for (let i = 1; i < reqRechercher.length; i++) {
            f += " OR " + reqRechercher[i];
         
        }
        
        if (reqRechercher.length != 0) f += '))';
        // f += ")";
  
  
        if (loadOptions.filter) {
            loadOptions.searchValue = f;
        }
        else {
          loadOptions.searchValue = "(* AND (is_active:true))";
        }


        return http.get( 'http://127.0.0.1:8282/api/search?' + 'app=CM&search=' + btoa(loadOptions.searchValue) + params + '&index=contact', {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
        .pipe(
          catchError(err => {
            
              this.dataSource = null;
            return throwError("L'index n'existe pas ! Aucun contact trouvé!");
             // return Observable.throw(null);
              
            
          })
      )   
        .toPromise()
            .then((data: any) => {
             
        
                    this.listUser = [];
             
                    for (let t of data.result.data[0]) {
                    //  this.checkEdit(t._source);
                        this.listUser.push(t._source);
                    }
                   
                  total=data.result.total;
                 
                    if (loadOptions.take == undefined) loadOptions.take = 5;
                 
                    return {
                        data: this.listUser,
                        totalCount: data.result.total[0],
                        take: data.result.total[0]
                    }
                    
                },
              
            )

          
          }

        
        
        
        }

  )


this.ListeT=[];
  this.getListHeaderFilter('contactType',this.ListeT);




this.ListeS=[];
  this.getListHeaderFilter('secteurDactivite',this.ListeS);




this.ListeO=[];
  this.getListHeaderFilter('organisme',this.ListeO);
*/
  
}




// function to get non redudent data


refreshtest(e){

  this.dataGrid.instance.clearFilter();
  this.dataGrid.instance.clearSelection();
  this.dataGrid.instance.clearSorting();
  this.dataGrid.instance.refresh();
}

//
getListHeaderFilter (type,list): any
{
  let f=[];
  
  //this.ListeT=[];
 /* this.http.get( 'http://127.0.0.1:8282/api/contacts' , {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
  .subscribe((data: any) => {
    
 for (let t of data) {
             if(t[type]!="" && t["isActive"] && t[type]!=null){
              f.push(t[type]);
             }
             
          
            }
       
            let unique = f.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
          })
       
        for (let t of unique) {
        
          let filter = new filterH();
          filter.text=t;
          filter.value=[type,"=",t];
       
         list.push(filter);
         }
      
      },
      error => {
        if(error.status==403){
          this.router.navigate([""])
        }
      
      }
  )
 */

}




   loadAll() {
  /*  this.contactService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<Contact[]>) => {
          return this.paginateContacts(res.body, res.headers);
        },
        err => {
    
         
          if(err.status==403){
            this.router.navigate(['']);
          }
        }
        //(res: HttpErrorResponse) => this.onError(res.message)
  
      );*/
      
  }
  show2()
  {
    document.getElementById("btn").click();
  }
  showInfo() {
 
    this.popupVisible = true;
}
;
  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  getMaxID() {
   
    return ++this.maxID;
}
setData(data)
{
  this.contacts=data;
  
}
protected paginateContacts(data: Contact[], headers: HttpHeaders)  {
var D1 = data[0].datePContact;

  
   
    this.maxID = data[data.length - 1].id;

    this.dataSource=data;
this.setData(data);
   


  }
 
  get todays() {
    return new Date();
  }


 fusionState;

  ngOnInit() {
   // this.model2=this.today;
  
   this.data.currentMessage.subscribe(message => this.message = message)
    this.data.refreshFusion.subscribe(val=>this.fusionState=val);
    this.data.refreshEdit.subscribe(val=>this.EditState=val);
   
   setInterval(()=>{
    if(this.fusionState=="true")
    {
      this.refreshDataGrid();
      this.fusionState="nope"
    }
    if(this.EditState=="true")
    {
      this.refreshDataGrid();
      this.EditState="nope"
    }
      
    if(this.importModule.alreadyImported)
      {
        this.refreshDataGrid();
        this.importModule.alreadyImported=false;
      }
      else{
       
      }
      
      
      },1000)
   
  }
 



  
  cloneIconClick(e) {
 
    var clonedItem = Object.assign({}, e.row.data, { ID: ++this.maxID });

   this.contacts.splice(e.row.rowIndex, 0, clonedItem);
  
    //e.event.preventDefault();
  }
  ContactsSplice(row,clone,data)
  { const contacts2=data;
    contacts2.splice(row, 0, clone);

  }
  parse(header: string): any {
    if (header.length === 0) {
        throw new Error('input must not be of zero length');
    }

    const parts: string[] = header.split(',');
    const links: any = {};


    parts.forEach(p => {
        const section: string[] = p.split(';');

        if (section.length !== 2) {
            throw new Error('section could not be split on ";"');
        }

        const url: string = section[0].replace(/<(.*)>/, '$1').trim();
        const queryString: any = {};

        url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3));

        let page: any = queryString.page;

        if (typeof page === 'string') {
            page = parseInt(page, 10);
        }

        const name: string = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = page;
    });
    return links;
}



// Verif Can Edit
EditTest;







checkEdit(data):Boolean
{
 
  return true;
  //let splitData=data[0].split(",");

/* try{
   
  let t=localStorage.getItem("roles").split(",");
  

  
  let cpt:any=0;
 
 if(splitData.length>1)
 {

  for(var j=0;j<splitData.length;j++){
    for(var  i=0;i<t.length;i++)
    {
      
      if(t[i]==splitData[j])
      {
        cpt=cpt+1;
      }
    }
  }
 if(cpt>0)
    {
      
     return true;
    }
   else 
    {
      return false;
      }

 }
 else if(splitData.length==1){
  for(var  i=0;i<t.length;i++)
  {
    
    if(t[i]==splitData)
    {
      cpt=cpt+1;
    }
  }

 
 
  if(cpt>0)
  {
    
   return true;
  }
 else 
  {
    return false;
    }

 }
  
  
    }catch(e)
    {
     
    }
 */




}

canDelete(data:any):Boolean{

 /* try{
    let t=localStorage.getItem("roles").split(",");
    
  
   
    
    let cpt:any=0;
    let splitData=data[0].split(",");
if(splitData.length>1){



for(var j=0;j<splitData.length;j++){
  for(var  i=0;i<t.length;i++)
         { 
        if( t[i]==splitData[j] && t.includes("canDeleteContact"))
        {
          cpt=cpt+1;
        }
      }
    }
     
     
      if(cpt>0)
      {
        
       return true;
      }
     else 
      {
        return false;
        }
}
else if(splitData.length==1)
{

  for(var  i=0;i<t.length;i++)
         { 
        if( t[i]==splitData && t.includes("canDeleteContact"))
        {
          cpt=cpt+1;
        }
      }
    
     
     
      if(cpt>0)
      {
        
       return true;
      }
     else 
      {
        return false;
        }
}
        
  
    
      }catch(e)
      {
  
      }
   
*/
return true;
}



canAdd(){

 /* try{
    let t=localStorage.getItem("roles").split(",");
    
  
   
    
    let cpt:any=0;
   
   
    for(var  i=0;i<t.length;i++)
      {
        
        if(t[i]=="canCreateContact" )
        {
          cpt=cpt+1;
        }
      }
    
     
     
      if(cpt>0)
      {
        
       return true;
      }
     else 
      {
        return false;
        }
  
    
      }catch(e)
      {
  
      }
   */
  return true;

}


canImport(){
/*
  try{
    let t=localStorage.getItem("roles").split(",");
    
  
   
    
    let cpt:any=0;
   
   
    for(var  i=0;i<t.length;i++)
      {
        
        if(t[i]=="canImportContact" )
        {
          cpt=cpt+1;
        }
      }
    
     
     
      if(cpt>0)
      {
        
       return true;
      }
     else 
      {
        return false;
        }
  
    
      }catch(e)
      {
  
      }
   
*/
return true;
}

canExport():Boolean{
  return true;
 /* try{
    let t=localStorage.getItem("roles").split(",");
    
  
   
    
    let cpt:any=0;
   
   
    for(var  i=0;i<t.length;i++)
      {
        
        if(t[i]=="canExportContact" )
        {
          cpt=cpt+1;
        }
      }
    
     
     
      if(cpt>0)
      {
        
       return true;
      }
     else 
      {
        return false;
        }
  
    
      }catch(e)
      {
  
      }
   
*/

}


deleteContactbyput(id)
{

  this.translate.get("CM.defSup2").subscribe(

    res=>{
      this.translate.get("CM.supprimer").subscribe(
        resultat=>{

          this.translate.get("CM.supprimerMsg").subscribe(
          r=>{
            this.translate.get("CM.Cancel").subscribe(
              res4=>{ 
  Swal.fire({
    title: res,
    width: 590,
    heightAuto: false,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: res4,
    confirmButtonText: resultat
  }).then((result) => {
    if (result.value) {
     
    /*  this.contactService.find(id).subscribe(result =>{

        let oldContact=result.body;
        this.deletedC=this.contactService.preDeleteFromForm(oldContact,id)
        
        this.contactService.update(this.deletedC).subscribe(res=>{
   
   
        this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
         res=>{
         
          let total=res["result"]["total"][0];
         localStorage.setItem("total",total);
          
         }
   
   
       )
        setTimeout(()=>{ this.dataGrid.instance.refresh();
       
       
       },1000)
       
       });
      
      });*/
      Swal.fire(
        
        r
        
      )
    }
  })
})
})
})
})
}


}
