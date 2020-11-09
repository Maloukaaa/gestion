import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from "../../Contact";
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { ImportModalComponent } from 'src/app/import-modal/import-modal.component';
import Swal from 'sweetalert2'
import { DataService } from '../service/data.service';
export class filterH{
  text:String;
  value:any;

}
@Component({
  selector: 'app-contact-fournisseur',
  templateUrl: './contact-fournisseur.component.html',
  styleUrls: ['./contact-fournisseur.component.scss']
})
export class ContactFournisseurComponent implements OnInit {
  contacts: Contact[];
  public ContactFournisseur;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  ListeT: any[];
  ListeS: any[];
  ListeO: any[];
  message:string;
  btnExportInstance: any;
  @ViewChild(ImportModalComponent, {static: false}) importModule: ImportModalComponent;
  deletedC: Contact;
  fusionState: string;
  EditState: string;

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

  refreshtest(e){
    this.dataGrid.instance.clearFilter();
    this.dataGrid.instance.clearSelection();
    this.dataGrid.instance.clearSorting();
    
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
       },1500)
     
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
  openModal(e){

         this.importModule.openModal();
    this.dataGrid.instance.refresh();
      }
refreshDataGrid() {
  this.dataGrid.instance.refresh();
}


ouvrir(e)
{
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

  constructor(private data: DataService,protected contactService: ContactService, private translate: TranslateService,private router:Router,private http:HttpClient) {


    this.ContactFournisseur = new CustomStore({
      key: "id",
      load: function (loadOptions: any) {
     
        let total;
     
       loadOptions.select= "id";
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
                      reqRechercher.push('((' + tabOR[i][0][0] + ':[ ' + tabOR[i][0][2] + '+TO+ * ]) AND (' + tabOR[i][2][0] + ':[ * +TO+ ' + tabOR[i][2][2] + ']))')
                      break;
                  }
    
              }
          }
          let f: string = "";
    
          if (q.length != 0) f += '(((is_active:true) AND (contactType:Fournisseur)) AND (' + q[0];
          for (let i = 1; i < q.length; i++) {
              f += " AND " + q[i];
          }
          if (q.length != 0) f += '))';
          if ((f != "") && reqRechercher.length != 0) f += "AND"
          if (reqRechercher.length != 0) f += '(((is_active:true) AND (contactType:Fournisseur)) AND (' + reqRechercher[0];
          for (let i = 1; i < reqRechercher.length; i++) {
              f += " OR " + reqRechercher[i];
          }
          if (reqRechercher.length != 0) f += '))';
          // f += ")";
    
    
          if (loadOptions.filter) {
              loadOptions.searchValue = f;
          }
          else {
              loadOptions.searchValue = "(* AND (is_active:true) AND (contactType:Fournisseur))";
          }
  
          return http.get( 'http://127.0.0.1:8282/api/search?' + 'app=CM&search=' + btoa(loadOptions.searchValue) + params + '&index=contact', {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
              .toPromise()
              .then((data: any) => {
               
           
                      this.listUser = [];
                      for (let t of data.result.data[0]) {
                      //  this.checkEdit(t._source);
                          this.listUser.push(t._source);
                      }
                     
                    total=data.result.total;
                   
                      if (loadOptions.take == undefined) loadOptions.take = 5;
                   // loadOptions.take = data.hits.total;
                   // loadOptions.skip = 0;
                  
                      return {
                          data: this.listUser,
                          totalCount: data.result.total[0],
                          take: data.result.total[0]
                      }
                      
                  },
                  error => {
                    if(error.status==403){
                      this.router.navigate([""])
                    }
                
                  }
              )
  
            
            }}
  
    )
    
    this.ListeT=[];
    this.getListHeaderFilter('contactType',this.ListeT);
  

  
  
  this.ListeS=[];
    this.getListHeaderFilter('secteurDactivite',this.ListeS);
  
  
  
  
  this.ListeO=[];
    this.getListHeaderFilter('organisme',this.ListeO);
  
    



   }


   getListHeaderFilter (type,list): any
   {
     let f=[];
     
     //this.ListeT=[];
     this.http.get( 'http://127.0.0.1:8282/api/contacts' , {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
     .subscribe((data: any) => {
              
    for (let t of data) {
                if(t[type]!="" && t["contactType"]=="Fournisseur" && t["isActive"] && t[type]!=null){
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
    
   
   }
  handleSuccessfulResponse(response)
{ 
    this.contacts=response;
    this.ContactFournisseur=response;
}
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
   


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


  checkEdit(data):Boolean
{

 try{
  let splitData=data[0].split(",");
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
 




}

canDelete(data:any):Boolean{

  try{
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
   


}

  
  
  canAdd():Boolean{
  
    try{
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
     
  
  
  }
  
  
  canFusion():Boolean{
  
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
     
  
  
  }

  canImport():Boolean{
  
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
     
  
  
  }
  
  canExport():Boolean{
  
    try{
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
       
        this.contactService.find(id).subscribe(result =>{
  
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
        
        });
        Swal.fire(
          
          r
          
        )
      }
    })
  })
})
})})
  }

}
