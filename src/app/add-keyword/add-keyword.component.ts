import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import CustomStore from "devextreme/data/custom_store";
import {KeyWord} from '../service/keyword'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {KeyWordService} from '../service/keyword.service'
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-add-keyword',
  templateUrl: './add-keyword.component.html',
  styleUrls: ['./add-keyword.component.scss']
})
export class AddKeywordComponent implements OnInit {
  public formAdd:FormGroup;
  public keyword:AbstractControl;
 public value:AbstractControl;
  submitted: boolean;
  id: any;
  listSecteurDactivite: any;
  list= [];
  constructor(private data: DataService,fb:FormBuilder,private keywordService:KeyWordService,private route:ActivatedRoute, private router:Router,private location: Location,private http:HttpClient) { 
    
    this.formAdd = fb.group({
      'keyword': ['' ],
      'value': ['',Validators.required] 
  });

  this.keyword = this.formAdd.controls['keyword'];
 
   this.value = this.formAdd.controls['value'];

  }


  get f() {
   
    return this.formAdd.controls; }
  ngOnInit() {
    this.http.get<any[]>("http://127.0.0.1:8282/api/key-words", {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    .subscribe(
      res=>{
       console.log(res);
        for(var i=0;i<res.length;i++){
       
          let result=res[i].keyword;
         if(res[i].isActive && result!="" && result!=null){
          this.list.push(result);
          
         }
          
        }
        this.list = this.list.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })
      }


    )
    
  }

  valueState=false;
  keywordState=false;
  valueErrMsg;
  keywordErrMsg;

  public onSubmit(values:KeyWord):void {
    console.log(values)
   
    this.submitted = true;
  
 
 
          this.keywordService.create(values).subscribe(
            Response=>{
            
              console.log("add "+JSON.stringify(Response))
         /*   this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
      res=>{
        console.log(res["result"]["total"][0]);
       let total=res["result"]["total"][0];
      localStorage.setItem("total",total);
       
      }


    )*/
    this.data.changeER("true");
            this.location.back();
          },
            err=>{
             
             
              for(var i=0;i<err["error"].length;i++)
              {     console.dir(err["error"][i].ErreurFiedld[0]);
                    console.dir(err["error"][i].ErreurMessage[0]);
                    if(err["error"][i].ErreurFiedld[0]=="value")
                    {
                      this.valueState=true;
                      this.valueErrMsg=err["error"][i].ErreurMessage[0];
                      
                    }

                    if(err["error"][i].ErreurFiedld[0]=="keyword")
                    {
                    this.keywordState=true;
                      this.keywordErrMsg=err["error"][i].ErreurMessage[0];
                      document.getElementsByClassName("e-input-group e-control-wrapper e-ddl")[0].setAttribute("style","border-color:#dc3545");
                    }
              }
              
      
           
           
          }
          )
 
           
         
    

    }
  
     
    changeStyle()
    {
      
      document.getElementsByClassName("e-input-group e-control-wrapper e-ddl")[0].setAttribute("style","border-color:#ced4da");

    }
    setState()
    {
      this.keywordState=false;
    }

      previousState() {
       
        this.location.back();
       
      }

}
