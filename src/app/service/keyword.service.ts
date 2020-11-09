
import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRequestOption } from './reques-util';
import {KeyWord} from '../service/keyword'
import { Token, removeSummaryDuplicates } from '@angular/compiler';
import { DxDataGridComponent } from 'devextreme-angular';
//import { DatePipe } from '@angular/common';

type EntityResponseType = HttpResponse<KeyWord>;
type EntityArrayResponseType = HttpResponse<KeyWord[]>;

@Injectable({ providedIn: 'root' })
export class KeyWordService {
  public resourceUrl = 'http://localhost:8282/api/key-words';
  isItLoggedIn: boolean;
  currentToken: string;
  
  constructor(protected http: HttpClient) {  }


  getRole(){
    let  token=localStorage.getItem("token");
   
    let headers1 = new HttpHeaders().append('Authorization', token);
    return this.http.get<Object>('https://profile.picosoft.biz/gestion_profile/api/getEffectMyUserNameList/KW',{headers: headers1 , observe: 'response'})
  }

  create(keywords: KeyWord): Observable<EntityResponseType> {
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    //const copy = this.convertDateFromClient(contact);
    return this.http
      .post<KeyWord>(this.resourceUrl, keywords, {headers: headers1,observe: 'response' })
     // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(keywords: KeyWord): Observable<EntityResponseType> {
   console.log("inside")
   // const copy = this.convertDateFromClient(contact);
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    return this.http
      .put<KeyWord>(this.resourceUrl, keywords, { headers: headers1,observe: 'response' })
      //.pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


 

  find(id: number): Observable<EntityResponseType> {
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    return this.http
      .get<KeyWord>(`${this.resourceUrl}/${id}`, {headers: headers1, observe: 'response' })
     // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    let  token=localStorage.getItem("token");


    let headers1 = new HttpHeaders().append('Authorization', token);
    
    const options = createRequestOption(req);
    return this.http
      .get<KeyWord[]>(this.resourceUrl, { headers:headers1,params: options, observe: 'response' })
      //.pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    let  token=localStorage.getItem("token");
    let headers1 = new HttpHeaders().append('Authorization', token);
    
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { headers:headers1, observe: 'response' });
  }


 



  getToken(user:any)
  {
    this.isItLoggedIn = true;
return this.http.post('http://localhost:8282/api/AuthenticateForKeyword',user,{responseType:"text"})

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

deleteKeyword2(id)
{
  this.find(id).subscribe(result =>{
    console.log(result.body);
    let oldContact=result.body;
    this.deletedC=this.createFromForm(oldContact,id)
    console.log(this.deletedC);
    this.update(this.deletedC).subscribe(res=>{
      console.log("ok  0 ");
      console.dir(res)
  
    
  
  });
    
    //this.dataGrid.instance.refresh();
  });

   
}

createFromForm(result,id): KeyWord {
  return {
    ...new KeyWord(),
    id: id,
    keyword: result.nom,
    value: result.value,
    authors : result.authors,
    readers : result.readers,
    isActive : false,
    isTest : false,
    comment : result.comment
  };
}

preDeleteFromForm(result,id): KeyWord {
  return {
    ...new KeyWord(),
    id: id,
    keyword: result.nom,
    value: result.value,
    authors : result.authors,
    readers : result.readers,
    isActive : false,
    isTest : false,
    comment : result.comment
  };
}

restaureFromForm(result,id): KeyWord {
  return {
    ...new KeyWord(),
    id: id,
    keyword: result.nom,
    value: result.value,
    authors : result.authors,
    readers : result.readers,
    isActive : true,
    isTest : false,
    comment : result.comment
  };
}



}

