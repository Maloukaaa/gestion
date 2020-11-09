import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import { jaLocale,arLocale,frLocale ,listLocales, defineLocale } from 'ngx-bootstrap/chronos';
import { Contact } from "../../Contact";
import { ContactService } from '../service/contact.service';
import moment from 'moment';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DATE_FORMAT } from '../input.contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  public formAdd:FormGroup;
  public nom:AbstractControl;
 // public ids:AbstractControl;
  public email:AbstractControl;
  public contactType:AbstractControl;
  public codeDouane:AbstractControl;
  public codePostal:AbstractControl;
  public datePContact:AbstractControl;
  public fax:AbstractControl;
  public matriculeFiscale:AbstractControl;
 //public secteurDactivite:AbstractControl;
  public siteWeb:AbstractControl;
  public telBureau:AbstractControl;
  public ville:AbstractControl;
  public adresse:AbstractControl;
  public organisme:AbstractControl;
  public profession:AbstractControl;
 // public domaineDactivite:AbstractControl;
  id:number;
  oldContact:any;
  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
  submitted: boolean;
  constructor(private spinner: NgxSpinnerService,private data: DataService,private http:HttpClient,private localeService: BsLocaleService,fb:FormBuilder,private contactService:ContactService,private route:ActivatedRoute,private router:Router,private location: Location) { 
   
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
 




    this.formAdd = fb.group({
      'nom': ['',  Validators.required ],
      'email': ['' ,[Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]],
      'contactType': ['' ],
      'codeDouane': ['' ],
      'codePostal': ['' ],
      'datePContact': ['' ],
      'fax': ['' ],
      'matriculeFiscale': ['' ],
      //'secteurDactivite': ['' ],
      'profession': ['' ],
     // 'domaineDactivite': ['' ],
      'siteWeb': ['' ],
      'telBureau': ['' ],
      'ville': ['' ],
      'adresse': ['' ],
      'organisme':['']
  });


 this.nom = this.formAdd.controls['nom'];
 // this.ids = this.formAdd.controls['ids'].setValue(this.id);
  this.email = this.formAdd.controls['email'];
  this.contactType = this.formAdd.controls['contactType'];
  this.codeDouane = this.formAdd.controls['codeDouane'];
  this.codePostal = this.formAdd.controls['codePostal'];
  this.datePContact = this.formAdd.controls['datePContact'];
  this.fax = this.formAdd.controls['fax'];
  this.matriculeFiscale = this.formAdd.controls['matriculeFiscale'];
 // this.secteurDactivite = this.formAdd.controls['secteurDactivite'];
  this.siteWeb = this.formAdd.controls['siteWeb'];
  this.telBureau = this.formAdd.controls['telBureau'];
  this.ville = this.formAdd.controls['ville'];
  this.adresse = this.formAdd.controls['adresse'];
  this.organisme = this.formAdd.controls['organisme'];
  this.profession = this.formAdd.controls['profession'];
 // this.domaineDactivite = this.formAdd.controls['domaineDactivite'];
  }
  listSecteurDactivite=[];
  ListeDomaineDactivite=[];
  valueSecteurDactivite;
  valueDomaineDactivite;
  ListeTypeContact=['Client','Partenaire','Fournisseur'];
  get f() {
   
    return this.formAdd.controls; }
  ngOnInit() {

    this.spinner.show();

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
      
      },
      err=>{
          if(err.status==403)
          {
           // this.router.navigate(["/contact"]);
          }
        
      },
      ()=>{
       
    

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
      ,
      err=>{

        if(err.status==403)
        {
          //this.router.navigate(["/contact"]);
        }
      
      }


    )
    


    this.route.params.subscribe(param => {
      this.id= param.id;
      
      });
    let o=this.contactService.find(this.id).subscribe(result =>{
     console.log(this.checkEdit(result.body.authors));
     console.log(result.body.authors);
     if(!this.checkEdit(result.body.authors))
      {
        Swal.fire({
          icon: 'error',
          title: "Vous n'êtes pas authorisé à modifier ce document",
          allowOutsideClick:false,
          allowEscapeKey:false,
          allowEnterKey:false,
          showConfirmButton:true,
          confirmButtonText:"Retour à la page principale",
          width: 713,
          padding: '3em', 
          confirmButtonColor: "#f27474",
          customClass:{
            title : 'shodow'
          }
         
        })
        .then((result) => {
          if (result.value) {
            this.router.navigate(["/contact"]);
          }
        })
      }
      else{
        this.oldContact=result.body;
        this.prepareForm(this.oldContact);
  
        this.valueSecteurDactivite=this.oldContact.secteurDactivite;
    
        this.valueDomaineDactivite=this.oldContact.domaineDactivite;
      }
   
   
    
    },
    err=>{
      if(err.status==500)
      {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: "L'id inséré est introuvable",
          allowOutsideClick:false,
          allowEscapeKey:false,
          allowEnterKey:false,
          showConfirmButton:true,
          confirmButtonText:"Retour à la page principale",
          width: 713,
          padding: '3em', 
          confirmButtonColor: "#f27474",
          customClass:{
            title : 'shodow'
          }
         
        })
        .then((result) => {
          if (result.value) {
            this.router.navigate(["/contact"]);
          }
        })
        
        //this.router.navigate(["/contact"]);
     }
      /*else if(err.status==500)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
        this.router.navigate(["/contact"]);
      }*/
    

    },
    ()=>{

      setTimeout(() => {
     
        this.spinner.hide();
      }, 2000);
    });
   
  }
  checkEdit(data):Boolean
  {
    
   //console.log(data)
    let splitData=data.split(",");
 // console.log(splitData);
   try{
     
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

  previousState() {
    this.location.back();
  
  }

  public onSubmit(values:Object):void {
    this.submitted = true;

    let c=this.createFromForm();
    
   
    this.contactService.update(c).subscribe(result=>{
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
      if(err.status==403)
      {
        this.router.navigate(["/contact"]);
      }
    

    })
      }


      prepareForm(result:any)
      {
       
        //this.formAdd.controls['ids'].setValue(this.id);
        this.formAdd.controls['nom'].setValue(result.nom);
        this.formAdd.controls['email'].setValue(result.email);
        this.formAdd.controls['contactType'].setValue(result.contactType);
        this.formAdd.controls['codeDouane'].setValue(result.codeDouane);
        this.formAdd.controls['codePostal'].setValue(result.codePostal);
        this.formAdd.controls['datePContact'].setValue(result.datePContact._d);
        this.formAdd.controls['fax'].setValue(result.fax);
        this.formAdd.controls['matriculeFiscale'].setValue(result.matriculeFiscale);
       // this.formAdd.controls['secteurDactivite'].setValue(result.secteurDactivite);
        this.formAdd.controls['profession'].setValue(result.profession);
        //this.formAdd.controls['domaineDactivite'].setValue(result.domaineDactivite);
        this.formAdd.controls['siteWeb'].setValue(result.siteWeb);
        this.formAdd.controls['telBureau'].setValue(result.telBureau);
        this.formAdd.controls['ville'].setValue(result.ville);
        this.formAdd.controls['adresse'].setValue(result.adresse);
        this.formAdd.controls['organisme'].setValue(result.organisme);
      }

      private createFromForm(): Contact {
        return {
          ...new Contact(),
          id: Number.parseInt(this.id.toString()),
          nom: this.formAdd.get(['nom']).value,
          email: this.formAdd.get(['email']).value,
          adresse: this.formAdd.get(['adresse']).value,
          organisme: this.formAdd.get(['organisme']).value,
          codeDouane: this.formAdd.get(['codeDouane']).value,
          codePostal: this.formAdd.get(['codePostal']).value,
          datePContact: (this.formAdd.get(['datePContact']).value),
          fax: this.formAdd.get(['fax']).value,
          matriculeFiscale: this.formAdd.get(['matriculeFiscale']).value,
          secteurDactivite: this.valueSecteurDactivite,
          profession: this.formAdd.get(['profession']).value,
          domaineDactivite: this.valueDomaineDactivite,
          siteWeb: this.formAdd.get(['siteWeb']).value,
          telBureau: this.formAdd.get(['telBureau']).value,
          ville: this.formAdd.get(['ville']).value,
          contactType: this.formAdd.get(['contactType']).value
        };
      }
}
