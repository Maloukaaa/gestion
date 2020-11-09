
import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';

import { DATE_FORMAT } from '../input.contact';
import { map } from 'rxjs/operators';

//import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from './reques-util';
//import { IContact } from 'app/shared/model/contact.model';
import { Contact } from "../../Contact";
import { Token, removeSummaryDuplicates } from '@angular/compiler';
import { DxDataGridComponent } from 'devextreme-angular';
//import { DatePipe } from '@angular/common';

type EntityResponseType = HttpResponse<Contact>;
type EntityArrayResponseType = HttpResponse<Contact[]>;

@Injectable({ providedIn: 'root' })
export class ContactService {
  public resourceUrl = 'http://localhost:8282/api/contact';
  isItLoggedIn: boolean;
  currentToken: string;
  
  constructor(protected http: HttpClient) {  }


  getRole(){
    let  token=localStorage.getItem("token");
   
    let headers1 = new HttpHeaders().append('Authorization', token);
    return this.http.get<Object>('https://profile.picosoft.biz/gestion_profile/api/getEffectMyUserNameList/CM',{headers: headers1 , observe: 'response'})
  }

  create(contact: Contact): Observable<EntityResponseType> {
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    const copy = this.convertDateFromClient(contact);
    return this.http
      .post<Contact>(this.resourceUrl, copy, {headers: headers1,observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(contact: Contact): Observable<EntityResponseType> {
  
    const copy = this.convertDateFromClient(contact);
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    return this.http
      .put<Contact>(this.resourceUrl, copy, { headers: headers1,observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


  fusion(list,contact: Contact): Observable<EntityResponseType> {
  
     const copy = this.convertDateFromClient(contact);
     let  token=localStorage.getItem("token");
     let headers1 = new HttpHeaders().append('Authorization', token);
     return this.http
       .put<Contact>("http://localhost:8282/api/FusionnerContact?ids="+list, copy, { headers: headers1,observe: 'response' })
       .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
   }

  find(id: number): Observable<EntityResponseType> {
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    return this.http
      .get<Contact>(`${this.resourceUrl}/${id}`, {headers: headers1, observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    let  token=localStorage.getItem("token");


    let headers1 = new HttpHeaders().append('Authorization', token);
    
    const options = createRequestOption(req);
    return this.http
      .get<Contact[]>(this.resourceUrl, { headers:headers1,params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { headers:headers1, observe: 'response' });
  }

  protected convertDateFromClient(contact: Contact): Contact {

    const copy: Contact = Object.assign({}, contact, {
      datePContact: contact.datePContact != null  ? moment(contact.datePContact).format(DATE_FORMAT) : null
    });
        return copy;
  }








  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
   
    if (res.body) {
      res.body.datePContact = res.body.datePContact != null ? moment(res.body.datePContact) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
   
    if (res.body) {
      res.body.forEach((contact: Contact) => {
     
        contact.datePContact = contact.datePContact != null ? moment(contact.datePContact) : null;
      });
    }
    return res;
  }

 getContactByType(typeC: string)
  {

   let  token=localStorage.getItem("token");


    let headers1 = new HttpHeaders().append('Authorization', token);

let params = new HttpParams().set("type", typeC);

if(headers1.get("Authorization")!=null){
return this.http.get<Contact>('http://localhost:8282/api/contactsByType?type='+typeC, {headers: headers1})
}
  }



  getToken(user:any)
  {
    this.isItLoggedIn = true;
return this.http.post('http://localhost:8282/api/Authenticate',user,{responseType:"text"})

  }


  
  isLoggedIn() {
    if (this.loadToken() !== '' && this.loadToken() !== null) {
        this.isItLoggedIn = true;
    }
    return this.isItLoggedIn;

}


loadToken(): string {
  this.currentToken = localStorage.getItem("token");
  return this.currentToken;
}


deletedC;

deleteContact2(id)
{
  this.find(id).subscribe(result =>{
   
    let oldContact=result.body;
    this.deletedC=this.preDeleteFromForm(oldContact,id)
    
    this.update(this.deletedC).subscribe(res=>{
  
    
  
  });
    
    //this.dataGrid.instance.refresh();
  });

   
}

preDeleteFromForm(result,id): Contact {
  return {
    ...new Contact(),
    id: id,
    nom: result.nom,
    email: result.email,
    adresse: result.adresse,
    organisme: result.organisme,
    codeDouane: result.codeDouane,
    codePostal: result.codePostal,
    datePContact: result.datePContact._d,
    fax: result.fax,
    matriculeFiscale: result.matriculeFiscale,
    secteurDactivite: result.secteurDactivite,
    siteWeb: result.siteWeb,
    telBureau: result.telBureau,
    ville: result.ville,
    contactType: result.contactType,
    authors : result.authors,
    readers : result.readers,
    isActive : false,
    isTest : false,
    comment : result.comment
  };
}

restaureFromForm(result,id): Contact {
  return {
    ...new Contact(),
    id: id,
    nom: result.nom,
    email: result.email,
    adresse: result.adresse,
    organisme: result.organisme,
    codeDouane: result.codeDouane,
    codePostal: result.codePostal,
    datePContact: result.datePContact._d,
    fax: result.fax,
    matriculeFiscale: result.matriculeFiscale,
    secteurDactivite: result.secteurDactivite,
    siteWeb: result.siteWeb,
    telBureau: result.telBureau,
    ville: result.ville,
    contactType: result.contactType,
    authors : result.authors,
    readers : result.readers,
    isActive : true,
    isTest : false,
    comment : result.comment
  };
}


}

