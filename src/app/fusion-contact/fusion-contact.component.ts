import { Component, OnInit, ViewChild, Input, ɵConsole } from '@angular/core';
import { ContactComponent } from '../pages/contact/contact.component';
import { DataService } from '../pages/service/data.service';
import { ContactService } from '../pages/service/contact.service';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Contact } from '../Contact';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
@Component({
  selector: 'app-fusion-contact',
  templateUrl: './fusion-contact.component.html',
  styleUrls: ['./fusion-contact.component.scss']
})
export class FusionContactComponent implements OnInit {

  public formFusion:FormGroup;
  /*public nom:AbstractControl;
  public id:AbstractControl;
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
  public organisme:AbstractControl;*/
  value: any;
  valueNom: string;
  valueAdresse: any;
  valueCodePostal: any;
  valueEmail: any;
  valueDatePC: any;
  valueFax: any;
  valueTelBureau: string;
  valueOrganisme: string;
  valueSecteurDactivite: string;
  valueMatriculeFiscale: string;
  valueDomaineDactivite: string;
  valueProfession: string;
  valueVille: any;
  valueContactType: any;
  valueSite: any;
  valueCodeDouane: any;
  valueDatePC2: any;


  constructor(private spinner: NgxSpinnerService,private location: Location,fb:FormBuilder,private data: DataService,protected contactService: ContactService,private router:Router) { 

    this.formFusion = fb.group({
     'nom': ['' ],
     'id': ['' ],
   
       'email': [''],
      'contactType': ['Client' ],
      'codeDouane': ['' ],
      'codePostal': ['' ],
      'datePContact': [ ],
      'fax': ['' ],
      'matriculeFiscale': ['' ],
      'secteurDactivite': ['' ],
      'siteWeb': ['' ],
      'telBureau': ['' ],
      'ville': ['' ],
      'adresse': ['' ],
      'organisme':[''],
      'profession':[''],
      'domaineDactivite': ['']
  });

  this.data.currentMessage.subscribe(message => {this.message = message
    
    if(message==""){
      router.navigate(['/contact'])
    }
  
  },
  err=>{
router.navigate(['/contact'])

  }
    
    )
   if(this.message!=""){
    this.verifAllData();
    this.getAllData();
    
   
   } 
    

  

  }

ids;

message:string;

listNom=[];
ngOnInit() {
  this.spinner.show();


}
public datasNom=[] ;
public datasId=[];
public datasAdresse=[];
public datasCodePostal=[];
public datasEmail=[];
public datasCodeDouane=[];
public datasOrganisme=[];
public datasSite=[];
public datasDatePC=[];
public datasFax=[];
public datasMatriculeFiscale=[];
public datasSecteurDactivite=[];
public datasTelBureau=[];
public datasVille=[];
public datasContactType=[];
public datasProfession=[];
public datasDomaineDactivite=[];
public data1=[];
public valueID;
public dropDownListObject: DropDownListComponent;

public datas: string[] = [ 'Badminton', 'Basketball', 'Cricket', 'Football' ];
// set a value to pre-select
public values: string = 'Badminton';



getAllData()
{
 
  if(this.message!=""){

  this.ids=this.message.split(",");
 

  
  for(var i=0;i<this.ids.length;i++){

  this.contactService.find(this.ids[i]).subscribe(
    res=>{
    
     if(res.body.nom!="" && res.body.nom!=null){
      this.datasNom.push(res.body.nom);
     }
      console.log( this.datasNom);
      try{
        let dd= new Date(res.body.datePContact["_i"])
      
        this.datasDatePC.push(dd.toLocaleDateString());
      }catch(e)
      {

      }
    
      
      if(res.body.adresse!="" && res.body.adresse!=null){
        this.datasAdresse.push(res.body.adresse);
      }
      
      if(res.body.codePostal!="" && res.body.codePostal!=null )
      {
        this.datasCodePostal.push(res.body.codePostal);
      }
      
      
      this.datasId.push(res.body.id);
      
      if(res.body.siteWeb!="" && res.body.siteWeb!=null)
      {
        this.datasSite.push(res.body.siteWeb);
      }
      
      if(res.body.email!="" && res.body.email!=null)
      {
        this.datasEmail.push(res.body.email);
      }
     
      if(res.body.organisme!="" && res.body.organisme!=null)
      {
        this.datasOrganisme.push(res.body.organisme);
      }
      if(res.body.codeDouane!="" && res.body.codeDouane!=null )
      {
        this.datasCodeDouane.push(res.body.codeDouane);

      }
      if(res.body.fax!="" && res.body.fax!=null)
      {
        this.datasFax.push(res.body.fax);
      }
      if( res.body.matriculeFiscale!=null){
        if(res.body.matriculeFiscale.toString()!="")
        {
          this.datasMatriculeFiscale.push(res.body.matriculeFiscale.toString());
        }
        
      }
      if(res.body.secteurDactivite!="" && res.body.secteurDactivite!=null )
      {
        this.datasSecteurDactivite.push(res.body.secteurDactivite);
      }
      if(res.body.telBureau!="" && res.body.telBureau!=null)
      {
        this.datasTelBureau.push(res.body.telBureau);
      }
      
      if(res.body.ville!="" && res.body.ville!=null)
      {
        this.datasVille.push(res.body.ville);
      }
    
      this.datasContactType.push(res.body.contactType);
      if(res.body.profession!="" && res.body.profession!=null )
      {
        this.datasProfession.push(res.body.profession);
      }
     if(res.body.domaineDactivite!="" && res.body.domaineDactivite!=null)
     {
      this.datasDomaineDactivite.push(res.body.domaineDactivite);
     }
      
     
      

      this.datasCodePostal = this.datasCodePostal.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasNom = this.datasNom.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.datasAdresse = this.datasAdresse.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      
      this.datasEmail = this.datasEmail.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasId = this.datasId.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })


      this.datasCodeDouane = this.datasCodeDouane.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasOrganisme = this.datasOrganisme.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasProfession = this.datasProfession.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasSecteurDactivite = this.datasSecteurDactivite.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasDomaineDactivite = this.datasDomaineDactivite.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasDatePC = this.datasDatePC.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasSite = this.datasSite.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasMatriculeFiscale = this.datasMatriculeFiscale.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.datasVille = this.datasVille.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.datasFax = this.datasFax.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.datasContactType = this.datasContactType.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.datasTelBureau = this.datasTelBureau.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      


    }
    ,
    err=>
    {
    

    }
  )
}



}
}

setForm()
{
  this.formFusion.controls['id'].setValue(this.value);
  
  this.formFusion.controls['nom'].setValue(this.valueNom);
  this.formFusion.controls['adresse'].setValue(this.valueAdresse);
  this.formFusion.controls['codePostal'].setValue(this.valueCodePostal);
  this.formFusion.controls['email'].setValue(this.valueEmail);
  this.formFusion.controls['datePContact'].setValue(this.valueDatePC2);
  this.formFusion.controls['telBureau'].setValue(this.valueTelBureau);
  this.formFusion.controls['fax'].setValue(this.valueFax);
  this.formFusion.controls['secteurDactivite'].setValue(this.valueSecteurDactivite);
  this.formFusion.controls['matriculeFiscale'].setValue(this.valueMatriculeFiscale);
  this.formFusion.controls['domaineDactivite'].setValue(this.valueDomaineDactivite);
  this.formFusion.controls['profession'].setValue(this.valueProfession);
  this.formFusion.controls['ville'].setValue(this.valueVille);
  this.formFusion.controls['contactType'].setValue(this.valueContactType);
  this.formFusion.controls['siteWeb'].setValue(this.valueSite);
  this.formFusion.controls['codeDouane'].setValue(this.valueCodeDouane);
  this.formFusion.controls['organisme'].setValue(this.valueOrganisme);
 
let contactsN=this.createFromForm();
let ids:String[];

 this.contactService.fusion(this.message,contactsN).subscribe(
    res=>{
  
      this.data.changeFR("true");
      this.router.navigate(["/contact"]);
    }

  )

}
  
private createFromForm(): Contact {
  return {
    ...new Contact(),
    id: Number.parseInt(this.formFusion.get(['id']).value.toString()),
    nom: this.formFusion.get(['nom']).value,
    email: this.formFusion.get(['email']).value,
    adresse: this.formFusion.get(['adresse']).value,
    organisme: this.formFusion.get(['organisme']).value,
    codeDouane: this.formFusion.get(['codeDouane']).value,
    codePostal: this.formFusion.get(['codePostal']).value,
    datePContact: (this.formFusion.get(['datePContact']).value),
    fax: this.formFusion.get(['fax']).value,
    matriculeFiscale: this.formFusion.get(['matriculeFiscale']).value,
    secteurDactivite: this.formFusion.get(['secteurDactivite']).value,
    profession: this.formFusion.get(['profession']).value,
    domaineDactivite: this.formFusion.get(['domaineDactivite']).value,
    siteWeb: this.formFusion.get(['siteWeb']).value,
    telBureau: this.formFusion.get(['telBureau']).value,
    ville: this.formFusion.get(['ville']).value,
    contactType: this.formFusion.get(['contactType']).value
  };
}
getFirstVal(res)
{


  this.ids=this.message.split(",");

      this.value=res.id;
     this.valueNom=res.nom;
     this.valueAdresse=res.adresse;
     this.valueCodePostal=res.codePostal;
     this.valueEmail=res.email;
     let dd=new Date(res.datePContact["_i"]);
     
     this.valueOrganisme=res.organisme;
     this.valueDatePC=dd.toLocaleDateString();
     this.valueDatePC2=res.datePContact;
     this.valueFax=res.fax;
     this.valueTelBureau=res.telBureau;
     this.valueSecteurDactivite=res.secteurDactivite;
     this.valueMatriculeFiscale=res.matriculeFiscale;
     this.valueDomaineDactivite=res.domaineDactivite;
     this.valueProfession=res.profession;
     this.valueContactType=res.contactType;
     this.valueVille=res.ville;
     this.valueSite=res.siteWeb;
     this.valueCodeDouane=res.codeDouane;
    



}
previousState() {
       
  this.location.back();
  //window.close();
}


public onSubmit(values:Contact):void {

 
}


    ngAfterViewInit(e: any): void {
        // call the change event's function after initialized the component.
    
    }


    verifAllData()
    {
     let ss=false;
      let n=0;
      let v;
    
      this.ids=this.message.split(",");
    
      let observeGroup: Observable<any>[] = [];
      for(var i=0;i<this.ids.length;i++){

        observeGroup.push( this.contactService.find(this.ids[i]));
      }
   forkJoin(observeGroup).subscribe(res=>{

 let state=false;
   let index;
    for(var i=0;i<res.length;i++)
    {
    
        let val=res[i];
        if(val.body.nom!="" && val.body.adresse!="" && val.body.email!="" && val.body.organisme!="" && val.body.fax!="" && val.body.telBureau!="" && val.body.secteurDactivite!="" && val.body.matriculeFiscale!="" && val.body.domaineDactivite!="" && val.body.profession!="" && val.body.ville!="" && val.body.siteWeb!="" && val.body.codeDouane!="" && val.body.codePostal!="")
        {
           
           this.getFirstVal(val.body);
           setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
        state=true;
           break;
        }
      }
       if(!state)
        {
            let c=res[0].body;
          for(var i=1;i<res.length;i++)
          { 
            let val=res[i].body;
              if(c.nom=="")
              {
                if(val.nom!="")
                {
                  c.nom=val.nom;
                }
              }
              if(c.adresse=="")
              {
                if(val.adresse!="")
                {
                  c.adresse=val.adresse;
                }
                  
              }
              if(c.organisme=="")
              { if(val.organisme!="")
                {
                  c.organisme=val.organisme;
                }
              }
              if(c.email=="")
              {
                if(val.email!="")
                {
                  c.email=val.email;
                }
              }
              if(c.codeDouane=="")
              {
                if(val.codeDouane!="")
                {
                  c.codeDouane=val.codeDouane;
                }
              }
              if(c.codePostal=="")
              {
                if(val.codePostal!="")
                {
                  c.codePostal=val.codePostal;
                }
              }
              if(c.profession=="")
              { if(val.profession!="")
                {
                  c.profession=val.profession;
                }
              }
              if(c.secteurDactivite=="")
              {
                if(val.secteurDactivite!="")
                {
                  c.secteurDactivite=val.secteurDactivite;
                }
              }
              if(c.domaineDactivite=="")
              {
                if(val.domaineDactivite!="")
                {
                  c.domaineDactivite=val.domaineDactivite;
                }
              }
              if(c.ville=="")
              {
                if(val.ville!="")
                {
                  c.ville=val.ville;
                }
              }
              if(c.siteWeb=="")
              {
                if(val.siteWeb!="")
                {
                  c.siteWeb=val.siteWeb;
                }
              }

              if(c.fax=="")
              {
                if(val.fax!="")
                {
                  c.fax=val.fax;
                }
              }
              if(c.telBureau=="")
              {
                if(val.telBureau!="")
                {
                  c.telBureau=val.telBureau;
                }
              }
              if(c.matriculeFiscale=="")
              {
                if(val.matriculeFiscale!="")
                {
                  c.matriculeFiscale=val.matriculeFiscale;
                }
              }

          }
           
          this.getFirstVal(c);
           setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
       
        }

    
    
   });
    

    }

     c=[];
}
