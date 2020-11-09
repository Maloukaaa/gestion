import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import { jaLocale,arLocale,frLocale ,listLocales, defineLocale } from 'ngx-bootstrap/chronos';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { ContactService } from '../service/contact.service';
import { Contact } from "../../Contact";
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-ajout-contact',
  templateUrl: './ajout-contact.component.html',
  styleUrls: ['./ajout-contact.component.scss']
})
export class AjoutContactComponent implements OnInit {
  /*locale = 'en';
  locales = listLocales();*/

  public formAdd:FormGroup;
  public nom:AbstractControl;
  //public prenom:AbstractControl;
  public email:AbstractControl;
  public contactType:AbstractControl;
  public codeDouane:AbstractControl;
  public codePostal:AbstractControl;
  public datePContact:AbstractControl;
  public fax:AbstractControl;
  public matriculeFiscale:AbstractControl;
  public secteurDactivite:AbstractControl;
  public siteWeb:AbstractControl;
  public telBureau:AbstractControl;
  public ville:AbstractControl;
  public adresse:AbstractControl;
  public organisme:AbstractControl;
  public profession:AbstractControl;
  public domaineDactivite:AbstractControl;
  submitted = false;

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private localeService: BsLocaleService,private data: DataService,fb:FormBuilder,private contactService:ContactService, private router:Router,private location: Location,private http:HttpClient) { 
   
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    

   

    this.formAdd = fb.group({
      'nom': ['' ,  Validators.required],
     // 'prenom': ['' ],
      'email': ['',[Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]],
      'contactType': ['Client' ],
      'codeDouane': ['' ],
      'codePostal': ['' ],
      'datePContact': [ ],
      'fax': ['' ],
      'matriculeFiscale': ['' ],
      'secteurDactivite': [''],
      'profession': ['' ],
      'domaineDactivite': ['' ],
      'siteWeb': ['' ],
      'telBureau': ['' ],
      'ville': ['' ],
      'adresse': ['' ],
      'organisme':['']
  });


  this.nom = this.formAdd.controls['nom'];
 // this.prenom = this.formAdd.controls['prenom'];
  this.email = this.formAdd.controls['email'];
  this.contactType = this.formAdd.controls['contactType'];
  this.codeDouane = this.formAdd.controls['codeDouane'];
  this.codePostal = this.formAdd.controls['codePostal'];
  this.datePContact = this.formAdd.controls['datePContact'];
  this.fax = this.formAdd.controls['fax'];
  this.matriculeFiscale = this.formAdd.controls['matriculeFiscale'];
  this.secteurDactivite = this.formAdd.controls['secteurDactivite'];
  this.siteWeb = this.formAdd.controls['siteWeb'];
  this.telBureau = this.formAdd.controls['telBureau'];
  this.ville = this.formAdd.controls['ville'];
  this.adresse = this.formAdd.controls['adresse'];
  this.organisme = this.formAdd.controls['organisme'];

  this.profession = this.formAdd.controls['profession'];
  this.domaineDactivite = this.formAdd.controls['domaineDactivite'];
  }
 test='test2';
listSecteurDactivite=[];
ListeDomaineDactivite=[];

ListeTypeContact=['Client','Partenaire','Fournisseur'];
  ngOnInit() {
    this.http.get<any[]>("http://127.0.0.1:8282/api/Bykeyword?keyword=Secteur d'activité", {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    .subscribe(
      res=>{
       
        for(var i=0;i<res.length;i++){
       
          let result=res[i].value;
         
          this.listSecteurDactivite.push(result);
          this.listSecteurDactivite = this.listSecteurDactivite.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
          })
        }
      
      }


    )

    this.http.get<any[]>("http://127.0.0.1:8282/api/Bykeyword?keyword=Domaine d'activité", {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    .subscribe(
      res=>{
       
        for(var i=0;i<res.length;i++){
       
          let result=res[i].value;
       
          this.ListeDomaineDactivite.push(result);
          this.ListeDomaineDactivite = this.ListeDomaineDactivite.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
          })
        }
  
      }


    )
  }

  get f() {
   
     return this.formAdd.controls; }

  public onSubmit(values:Contact):void {
  
    this.submitted = true;
  
    if(values["nom"]=="" )
{
  
 
  if(this.formAdd.controls.nom.status=="INVALID") 
        {
      
          return ;
        } 
        else {
        
          this.contactService.create(values).subscribe(
            Response=>{
            this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
      res=>{
       
       let total=res["result"]["total"][0];
      localStorage.setItem("total",total);
      this.data.changeER("true");
      }


    )
            this.location.back();
          },
            err=>{
            
            let s:string=err.error;
            
           
          }
          )
        }
}
else if(values["nom"]=="" && values["email"]!="")
{
 
  if(this.formAdd.controls.nom.status=="INVALID") 
        {
         
          return ;
        } 
        else {
        
          this.contactService.create(values).subscribe(
            Response=>{
            this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
      res=>{
     
       let total=res["result"]["total"][0];
      localStorage.setItem("total",total);
       
      }


    )
            this.location.back();
          },
            err=>{
             
            let s:string=err.error;
            
           
          }
          )
        }
}
else if(values["nom"]!="" && values["email"]!=""){
      
        
        if(this.formAdd.controls.email.status=="INVALID") 
        {
          
        } 
        else {
         
          this.contactService.create(values).subscribe(
            Response=>{
            this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
      res=>{
       
       let total=res["result"]["total"][0];
      localStorage.setItem("total",total);
       
      }


    )
            this.location.back();
          },
            err=>{
             
      
            let s:string=err.error;
            
           
          }
          )
        }
    
    

    }
  else{

    this.contactService.create(values).subscribe(
      Response=>{
      this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
        res=>{
       
         let total=res["result"]["total"][0];
        localStorage.setItem("total",total);
         
        }
  
  
      )
      this.location.back();
    },
      err=>{
       

      let s:string=err.error;
      
     
    }
    )
 
  }

     
      }
      previousState() {
       
        this.location.back();
        //window.close();
      }

     
}
