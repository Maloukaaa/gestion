
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from "devextreme/data/custom_store";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { KeyWordService } from '../service/keyword.service';
import Swal from 'sweetalert2';
import { DataService } from '../service/data.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-administration-keyword',
  templateUrl: './administration-keyword.component.html',
  styleUrls: ['./administration-keyword.component.scss']
})
export class AdministrationKeywordComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  public dataSource2;
  fusionState: string;
  EditState: string;
  deletedC: any;
 
  onToolbarPreparing(e) {

    this.translate.get("CM.rafraichir").subscribe((res) => {
    e.toolbarOptions.items.unshift(
      {
          location: 'after',
          widget: 'dxButton',
          options: {
              hint: res,
              icon: 'refresh',
              onClick: this.refreshDataGrid.bind(this),
          }
      })
    })

    
}

  

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
 


  constructor(private translate: TranslateService,private data: DataService,private router:Router, private http:HttpClient,private keywordService:KeyWordService) { 
    this.dataSource2 = new CustomStore({
    key: "id",
    load: function (loadOptions: any) {
      let total;

        var params = "";

        if(loadOptions.take==undefined && loadOptions.skip==undefined){
        
         params += '&size=' +localStorage.getItem("total");
          params += '&from=' ;
          console.log("inside this "+params);
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
                    if (loadOptions.filter[i] != 'or')
                        tabOR.push(loadOptions.filter[i]);
            }
            else
                tab.push([loadOptions.filter[0], loadOptions.filter[1], loadOptions.filter[2]]);
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
  
        if (q.length != 0) f += '(((is_active:false)) AND (' + q[0];
        for (let i = 1; i < q.length; i++) {
            f += " AND " + q[i];
        }
        if (q.length != 0) f += '))';
        if ((f != "") && reqRechercher.length != 0) f += "AND"
        if (reqRechercher.length != 0) f += '(((is_active:false)) AND (' + reqRechercher[0];
        for (let i = 1; i < reqRechercher.length; i++) {
            f += " OR " + reqRechercher[i];
        }
        if (reqRechercher.length != 0) f += '))';
        // f += ")";
  
  
        if (loadOptions.filter) {
            loadOptions.searchValue = f;
        }
        else {
            loadOptions.searchValue = "(* AND (is_active:false))";
        }
console.log(params);

        return http.get( 'http://127.0.0.1:8282/api/searchForKeyword?' + 'app=KW&search=' + btoa(loadOptions.searchValue) + params + '&index=keyword', {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
        .pipe(
          catchError(err => {
              console.log('Handling error locally and rethrowing it...', err);
              this.dataSource = null;
            return throwError("L'index n'existe pas ! Aucun contact trouvé!");
    
            
          })
      )   
        .toPromise()
            .then((data: any) => {
             
         console.log("here and there")
         console.log(data)
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

          
          }}

  )
  }
 

    canDelete(data:any):Boolean{
      
          try{
            let t=localStorage.getItem("rolesK").split(",");
            
          
           
            
            let cpt:any=0;
            let splitData=data[0].split(",");
        if(splitData.length>1){
        
        
        //console.log(splitData[0]+" "+splitData[1]);
        for(var j=0;j<splitData.length;j++){
          for(var  i=0;i<t.length;i++)
                 { 
                if( t[i]==splitData[j] && t.includes("DeleteKeyword"))
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
                if( t[i]==splitData && t.includes("DeleteKeyword"))
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

deletekeyword(id)
{
  this.translate.get("CM.defSupK").subscribe(

    res=>{
      this.translate.get("CM.supprimer2").subscribe(
        resultat=>{

          this.translate.get("CM.SuppKMsg").subscribe(
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
        cancelButtonText : res4,
        confirmButtonText: resultat
      }).then((result) => {
        if (result.value) {
          console.log("here we are!!!")
          this.keywordService.delete(id).subscribe
          (
              res=>{
                  console.log(res);
                //  this.refreshDataGrid();
              },
              err=>{
                  console.log(err);
              }
          )
          Swal.fire(
            
            r
          
          )
          setTimeout(()=>{
            this.refreshDataGrid();
        },1000)
        }
      })
    })
  })
})
})
}
  ngOnInit() {
    this.data.refreshEdit.subscribe(val=>this.EditState=val);
    this.data.refreshFusion.subscribe(val=>this.fusionState=val);
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
      
    
        
        
        },1000)
  }



  
  RestoreKeyword(id){
  
    this.translate.get("CM.defResK").subscribe(
      res=>{
  
        this.translate.get("CM.restaure").subscribe(
          res2=>{   
  
            this.translate.get("CM.restaureMsgK").subscribe(
              res3=>{ 
                
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
      confirmButtonText: res2
    }).then((result) => {
      if (result.value) {
       
        this.keywordService.find(id).subscribe(result =>{
  
          let oldContact=result.body;
          this.deletedC=this.keywordService.restaureFromForm(oldContact,id)
          
          this.keywordService.update(this.deletedC).subscribe(res=>{
     
     
       /*   this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
           res=>{
            
            let total=res["result"]["total"][0];
           localStorage.setItem("total",total);
            
           }
     
     
         )*/
          setTimeout(()=>{ this.dataGrid.instance.refresh();
         
         
         },1000)
         
         });
        
        });
        Swal.fire(
          
          res3
          
        )
      }
    })
   
  })
  })
  })
  })
  }
  

}
