import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService, NotifierOptions } from "angular-notifier";
import { DxDataGridComponent } from 'devextreme-angular';
import { ContactClientComponent } from '../pages/contact-client/contact-client.component';
import { Settings } from '../app.settings.model';
import { AppSettings } from '../app.settings';
import { NgxSpinnerService } from "ngx-spinner";
import { TranslateService } from '@ngx-translate/core';

export class ErreurL{
  ligne:String;
  msg:any;
  value:any;
  Evalue:any;
  headerV:any;

}
@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss']
})
export class ImportModalComponent implements OnInit {
  public formImport:FormGroup;
  public importField:AbstractControl;
  public importFieldPreData="";
  public importFieldData="";
  public settings: Settings;
public color= "#5f7c8a";
  public changed;
 // @ViewChild('gridContainer', { static: false }) dataGrid: DxDataGridComponent;
  private readonly notifier: NotifierService;
  ispopUpShow: boolean;
   isCollapsed = true;
  importFieldPreData1: any;
  importFieldPreData2: any;
  importFieldPreData3: any;
  importFieldData3: any;
  importFieldData2: any;
  importFieldData1: any;
  headerErreurMSGC: string;
  constructor(private translate: TranslateService,private spinner: NgxSpinnerService,public appSettings:AppSettings,fb:FormBuilder,private http:HttpClient,notifierService: NotifierService) {
    this.settings = this.appSettings.settings;
    this.notifier = notifierService;
    this.formImport = fb.group({
      'importField': ['' ],
     
      
  });


  this.importField = this.formImport.controls['importField'];
   }



alreadyImported=false;

  ngOnInit() {
    
    let element = document.getElementById('1');
    element.className = 'step active';
setInterval(()=>{
try{
  if(sessionStorage.getItem("skin")!=null )
  {
    let element=document.getElementById("header");
    element.className="modal-header modal-header-primary themes "+sessionStorage.getItem("skin");
    let element2=document.getElementById("import");
    element2.className="btn btn-default btn-lg themes "+sessionStorage.getItem("skin")+"2";
    let element3=document.getElementById("valider");
    element3.className="btn btn-default btn-lg themes "+sessionStorage.getItem("skin")+"2";
  }
  else
  {
    let element=document.getElementById("header");
    element.className="modal-header modal-header-primary themes green2";
    let element2=document.getElementById("import");
    element2.className="btn btn-default btn-lg themes green2";
    let element3=document.getElementById("valider");
    element3.className="btn btn-default btn-lg themes green2 ";
  }
  

}catch(e){}

},2000)


  }
  panelOpenState = false;
  displayStep3='none';
  displayStep1='nones';
  displayStep2='none';
  displayErrHeader='none';
  public display='none';
        openModal(){
   let element:Element=document.getElementsByClassName("app")[0];
       element.setAttribute("style","overflow:hidden!important;");
          this.display='block';
   
       }
    ClickedOut(event) {
      if(event.target.className === "hover_bkgr_fricc") {
        this.ispopUpShow = false;
      } 
    }
  //  @ViewChild(ContactClientComponent, {static: false}) ccModule: ContactClientComponent;
       onCloseHandled(){
      let element22:Element=document.getElementsByClassName("app")[0];
      element22.setAttribute("style","overflow:auto!important;");
          this.formImport.controls['importField'].setValue("");
          this.display='none';
          this.displayStep1='flex';
          this.displayStep3="none";
          this.displayStep2="none";
      let element3 = document.getElementById('3');
      element3.className = 'step';
      let element2 = document.getElementById('2');
      element2.className = 'step';
      let element = document.getElementById('1');
        element.className = 'step active';
         }

      importer()
      {
        this.importPreData();
           
      }

      public onSubmit(values:Object):void {
     
       
        this.importer();

      
          }


      precedent(){
        this.displayStep1='flex';
        this.displayStep3="none";
        this.displayStep2="none";
        let element = document.getElementById('1');
        element.className = 'step active';
        let element2 = document.getElementById('2');
    element2.className = 'step';
    this.headerErreurMSG=[];
    this.line=[];

      }


      valider(){
        this.spinner.show();
          this.importData();
      }
      headerErreurMSG=[];
      headerErreurVal;
      headerVal;
      line=[];
      NodisplayErrHeader="contents";
      withVal2=false;
      msgs="";
      getErrors (lignes)
      {
        let locale=sessionStorage.getItem("locale");
            console.log(lignes);
            for(var i=0;i<lignes.length;i++)
            {
              

                if(lignes[i]["ErreurHeader"][0])
                {  
                
                  
                if(lignes[i]["Erreur"][0]=="less")
                  {
                    
                      this.headerErreurVal=lignes[i]["values"]
                      let c = new ErreurL();
                      if(lignes[i]["ligne"][0]>1){
                        this.headerVal=lignes[i]["header"];
                        c.ligne=lignes[i]["ligne"][0];
                        if(locale=='fr')
                        {
                          c.msg="Le nombre des valeurs entrées est supérieur à celui des champs";
                        }
                        else if(locale=='en')
                        {
                          c.msg="The number of values ​​entered is greater than that of the fields";
                        }
                       
                        c.value=this.headerErreurVal;
                        c.Evalue="";
                        c.headerV=this.headerVal;
                       
                        this.headerErreurMSG.push(c);
                        this.NodisplayErrHeader="none";
                        this.displayErrHeader='block';
                        
                      }
                      else if(lignes[i]["ligne"][0]==1){
                        this.headerVal=lignes[0]["header"];
                        c.ligne=lignes[i]["ligne"][0];

                        if(locale=='fr')
                        {
                          c.msg="Le nombre des valeurs entrées est supérieur à celui des champs";
                        }
                        else if(locale=='en')
                        {
                          c.msg="The number of values ​​entered is greater than that of the fields";
                        }
                        
                        c.value=this.headerVal;
                        c.Evalue="";
                        c.headerV=this.headerVal;
                       
                        this.headerErreurMSG.push(c);
                        this.NodisplayErrHeader="none";
                        this.displayErrHeader='block';
                       
                      }
                     
                  }
                  else if(lignes[i]["Erreur"][0]=="more"){
                    
                    this.headerErreurVal=lignes[i]["values"];
                    let c = new ErreurL();
                    if(lignes[i]["ligne"][0]>1){
                      this.headerVal=lignes[i]["header"];
                      c.ligne=lignes[i]["ligne"][0];
                      if(locale=='fr')
                      {
                        c.msg="Le nombre des valeurs entrées est inférieur à celui des champs";
                      }
                      else if(locale=='en')
                      {
                        c.msg="The number of values ​​entered is less than the number of fields";
                      }

                    
                      c.value=this.headerErreurVal;
                      c.Evalue="";
                      c.headerV=this.headerVal;
                    
                      this.headerErreurMSG.push(c);
                      this.NodisplayErrHeader="none";
                    this.displayErrHeader='block';
                   
                    }
                    else if(lignes[i]["ligne"][0]==1){
                     
                      this.headerVal=lignes[0]["header"];
                      c.ligne=lignes[i]["ligne"][0];
                      if(locale=='fr')
                      {
                        c.msg="Le nombre des valeurs entrées est inférieur à celui des champs";
                      }
                      else if(locale=='en')
                      {
                        c.msg="The number of values ​​entered is less than the number of fields";
                      }

                      c.value=this.headerVal;
                      c.Evalue="";
                      c.headerV=this.headerVal;
                  
                      this.headerErreurMSG.push(c);
                      this.NodisplayErrHeader="none";
                      this.displayErrHeader='block';
                     

                    }
                  }
                  else 
                  {
                     
                    let c = new ErreurL();
                    c.ligne=lignes[i]["ligne"][0];
                    if(lignes[i]["ligne"][0]==1){
                    
                      this.headerVal=lignes[0]["header"];
                      c.msg="Le champ saisi doit être remplacer par ' "+lignes[i]["ErreurField"][0][1]+" '";
                      if(locale=='fr')
                      {
                        c.msg="Le champ saisi doit être remplacer par ' "+lignes[i]["ErreurField"][0][1]+" '";
                      }
                      else if(locale=='en')
                      {
                        c.msg="The field entered must be replaced by ' "+lignes[i]["ErreurField"][0][1]+" '";
                      }

                      c.value=this.headerVal;
                      c.Evalue=lignes[i]["ErreurField"][0][0];
                      c.headerV=this.headerVal;
                     
                      this.headerErreurMSG.push(c);
                      this.NodisplayErrHeader="none";
                   
                        this.displayErrHeader='block';
                      
  
                    }

                  }
                }
                else
                {
                
                  let c = new ErreurL();
                  if(lignes[i]["Erreur"][0]==null)
                  { 
                    this.headerVal=lignes[i]["header"];
                   
                    c.ligne=lignes[i]["ligne"][0];
                    c.value=lignes[i]["values"][0];
                    c.msg="Le champ ' "+lignes[i]["ErreurField"]+" ' est null."

                    if(locale=='fr')
                    {
                      c.msg="Le champ ' "+lignes[i]["ErreurField"]+" ' est null.";
                    }
                    else if(locale=='en')
                    {
                      c.msg="The field ' "+lignes[i]["ErreurField"]+" ' is null.";
                    }

                    c.Evalue=lignes[i]["contact"] ;
                    c.headerV=this.headerVal;
                    this.headerErreurMSG.push(c);
                    this.NodisplayErrHeader="none";
                    this.displayErrHeader='block';
                  
                  }
                  else  if(lignes[i]["Erreur"][0]=='format')
                  {
                    this.headerVal=lignes[i]["header"];
                    c.ligne=lignes[i]["ligne"][0];
                  
                    c.value=lignes[i]["values"][0];
               
                    if(locale=='fr')
                    {
                      c.msg="Le champ ' "+lignes[i]["ErreurField"]+" ' est incorrect";
                    }
                    else if(locale=='en')
                    {
                      c.msg="The field ' "+lignes[i]["ErreurField"]+" ' is incorrect";
                    }
                    c.Evalue=lignes[i]["contact"] ;
                    c.headerV=this.headerVal;
                    this.msgs="La valeur entrée : "
                    this.headerErreurMSG.push(c);
                    this.NodisplayErrHeader="none";
                    this.displayErrHeader='block';
                   
                    

                  }
                  else  if(lignes[i]["Erreur"][0]=='type')
                  {
                    this.headerVal=lignes[i]["header"];
                    c.ligne=lignes[i]["ligne"][0];
                    c.value=lignes[i]["values"][0];
                    if(locale=='fr')
                    {
                      c.msg="Le champ ' "+lignes[i]["ErreurField"]+" ' est incorrect";
                    }
                    else if(locale=='en')
                    {
                      c.msg="The field ' "+lignes[i]["ErreurField"]+" ' is incorrect";
                    }
                    c.Evalue=lignes[i]["contact"] ;
                    c.headerV=this.headerVal;
                    this.msgs="La valeur entrée : "
                    this.headerErreurMSG.push(c);
                    this.NodisplayErrHeader="none";
                    this.displayErrHeader='block';


                  }
            


                }

            }
         
          
            this.headerErreurMSG = this.headerErreurMSG.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
            })

            console.log(this.headerErreurMSG);
      }


      importPreData()
      {

        let  token=localStorage.getItem("token");


        let headers1 = new HttpHeaders().append('Authorization', token);
        this.http.post('http://localhost:8282/api/PreImportContacts',this.formImport.controls['importField'].value, {headers: headers1}).subscribe(
          res=>{
         //   this.spinner.show();
           console.log(res);
           console.log(res["Lines incorrectes"])
          
           this.getErrors(res["Lines incorrectes"]);
            if(res["Erreurs"]==0){
              document.getElementById("valider").removeAttribute("disabled");
              this.importFieldPreData1=(res["Lines incorrectes"][0]["ligneT"][0]-res["Enregistrements sauvegardés"]);
      
              this.importFieldPreData3=res["Enregistrements sauvegardés"];
              this.displayErrHeader='none';
              this.NodisplayErrHeader="contents";
        

            }
            else if(res["Enregistrements sauvegardés"]==0){
              let l;
              for(var i=0;i<res["Lines incorrectes"].length;i++)
              {
                l=l+res["Lines incorrectes"][i];
              }
          
                document.getElementById("valider").setAttribute("disabled","true");
                this.importFieldPreData1=(res["Lines incorrectes"][0]["ligneT"][0]-res["Enregistrements sauvegardés"]);
      
                this.importFieldPreData3=res["Enregistrements sauvegardés"];

               
            }
            else {
              document.getElementById("valider").removeAttribute("disabled");
              this.importFieldPreData1=(res["Lines incorrectes"][0]["ligneT"][0]-res["Enregistrements sauvegardés"]);
      
              this.importFieldPreData3=res["Enregistrements sauvegardés"];
            }
            
           /* setTimeout(() => {
         
              this.spinner.hide();
            }, 100);
       
         */
          
            this.displayStep2="inline-block";
            this.displayStep3="none";
            this.displayStep1="none";
            let element = document.getElementById('1');
         
            element.className="step finish "+sessionStorage.getItem("skin");
            let element2 = document.getElementById('2');
             element2.className = 'step active';
             
          },
          error=>{
let locale=sessionStorage.getItem('locale');
            if(this.formImport.controls['importField'].value=="")
            {
             this.translate.get("CM.ImportEmpty").subscribe(
                res=>{
              this.notifier.notify("error", res);
               });
           }
            else{
          if(locale=='fr')
          {this.notifier.notify("error", error["error"].MessageFR);

          }
          else if(locale=='en')
          {
            this.notifier.notify("error", error["error"].MessageEN);
          }
             
            }
           

          },
          ()=>{

          }

        )


      }
      importData()
      {

        let  token=localStorage.getItem("token");


        let headers1 = new HttpHeaders().append('Authorization', token);
        this.http.post('http://localhost:8282/api/ImportContacts',this.formImport.controls['importField'].value, {headers: headers1}).subscribe(
          res=>{
         
            if(res["Erreurs"]==0){
              this.importFieldData1=(res["Lines incorrectes"][0]["ligneT"][0]-res["Enregistrements sauvegardés"]);
      
              this.importFieldData3=res["Enregistrements sauvegardés"];
            }
            else {
              this.importFieldData1=(res["Lines incorrectes"][0]["ligneT"][0]-res["Enregistrements sauvegardés"]);
      
              this.importFieldData3=res["Enregistrements sauvegardés"];
             
            }
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 100);
       
            
            this.displayStep1='none';
          
            this.displayStep2="none";
            this.displayStep3="block";
            let element = document.getElementById('1');
            element.className="step finish "+sessionStorage.getItem("skin");
            let element2 = document.getElementById('2');
            element2.className="step finish "+sessionStorage.getItem("skin");
            let element3 = document.getElementById('3');
            element3.className = 'step active';
           this.alreadyImported=true;
           this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
              res=>{
              
               let total=res["result"]["total"][0];
              localStorage.setItem("total",total);
               
              }
        
        
            )
            
          },
          error=>{
            
          
            this.notifier.notify("error", error["Erreurs"],);

          }

        )


      }


    
}

