import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.scss'],
  
})
export class ShowContactComponent implements OnInit {
  public contact:any;
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
  public secteurDactivite:AbstractControl;
  public siteWeb:AbstractControl;
  public telBureau:AbstractControl;
  public ville:AbstractControl;
  public adresse:AbstractControl;
  public organisme:AbstractControl;
  public profession:AbstractControl;
  public domaineDactivite:AbstractControl;
  id: any;
 
dat;
  oldContact;
  valueSecteurDactivite;
  valueDomaineDactivite;
  valueTypeContact;
  ListeDomaineDactivite=[];
  listSecteurDactivite=[];
  constructor(private http:HttpClient,private route: ActivatedRoute,fb:FormBuilder,private contactService:ContactService,private router:Router,private location: Location) { 

    this.formAdd = fb.group({
      'nom': [{value :'',disabled: true} ],
     
      'email': [{value :'',disabled: true} ],
      'contactType': [{value :'',disabled: true} ],
      'codeDouane': [{value :'',disabled: true} ],
      'codePostal': [{value :'',disabled: true} ],
      'datePContact': [{value :'',disabled: true} ],
      'fax': [{value :'',disabled: true} ],
      'ville': [{value :'',disabled: true} ],
      'adresse': [{value :'',disabled: true} ],
      'matriculeFiscale': [{value :'',disabled: true} ],
      'secteurDactivite': [{value :'',disabled: true} ],
      'siteWeb': [{value :'',disabled: true}],
      'telBureau': [{value :'',disabled: true} ],
      'profession': [{value :'',disabled: true} ],
      'domaineDactivite': [{value :'',disabled: true} ],
      'organisme':[{value :'',disabled: true}]
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
  this.secteurDactivite = this.formAdd.controls['secteurDactivite'];
  this.siteWeb = this.formAdd.controls['siteWeb'];
  this.telBureau = this.formAdd.controls['telBureau'];
  this.ville = this.formAdd.controls['ville'];
  this.adresse = this.formAdd.controls['adresse'];
  this.organisme = this.formAdd.controls['organisme'];
  this.profession = this.formAdd.controls['profession'];
  this.domaineDactivite = this.formAdd.controls['domaineDactivite'];
  }
  ListeTypeContact=['Client','Partenaire','Fournisseur'];
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.id= param.id;
      
      });


      this.http.get<any[]>("http://127.0.0.1:8382/api/Bykeyword?keyword=Secteur d'activité", {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    .subscribe(
      res=>{
    
        for(var i=0;i<res.length;i++){
  
          let result=res[i].value;
  
          this.listSecteurDactivite.push(result);
        }
      
      },
      err=>{},
      ()=>{
       
    

      }


    )

    this.http.get<any[]>("http://127.0.0.1:8382/api/Bykeyword?keyword=Domaine d'activité", {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    .subscribe(
      res=>{
       
        for(var i=0;i<res.length;i++){
        
          let result=res[i].value;
        
          this.ListeDomaineDactivite.push(result);
        }
     
      }


    )
   
      let o=this.contactService.find(this.id).subscribe(result =>{
       
        this.oldContact=result.body;
        this.dat=this.oldContact["authors"];
        this.prepareForm(this.oldContact);
        this.valueSecteurDactivite=this.oldContact.secteurDactivite;  
       
        this.valueDomaineDactivite=this.oldContact.domaineDactivite;
        this.valueTypeContact=this.oldContact.contactType;
      
      });
//this.contactService.getContactById(this.route.snapshot.params['id']).subscribe(data => {});
}
public onSubmit(values:Object):void {

setTimeout(()=>{
  this.router.navigate(["edit-contact/"+this.id])

},1000)
 
    }

previousState() {
  this.location.back();
  //this.router.navigate(["/contact"])
  //window.close();
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
  this.formAdd.controls['siteWeb'].setValue(result.siteWeb);
  this.formAdd.controls['telBureau'].setValue(result.telBureau);
  this.formAdd.controls['ville'].setValue(result.ville);
  this.formAdd.controls['adresse'].setValue(result.adresse);
  this.formAdd.controls['organisme'].setValue(result.organisme);
  this.formAdd.controls['profession'].setValue(result.profession);
 // this.formAdd.controls['domaineDactivite'].setValue(result.domaineDactivite);
 
}



checkEdit():Boolean
{
 try{
  let t=localStorage.getItem("roles").split(",");
  
  let cpt:any=0;
 
 
  for(var  i=0;i<t.length;i++)
    {
      
      if(t[i]==this.dat)
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


}