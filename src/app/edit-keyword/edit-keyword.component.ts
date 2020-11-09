import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import CustomStore from "devextreme/data/custom_store";
import {KeyWord} from '../service/keyword'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {KeyWordService} from '../service/keyword.service'
import { DataService } from '../service/data.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-keyword',
  templateUrl: './edit-keyword.component.html',
  styleUrls: ['./edit-keyword.component.scss']
})
export class EditKeywordComponent implements OnInit {
  oldKeyword:any;
  public formEdit:FormGroup;
 // public keyword:AbstractControl;
 public value:AbstractControl;
  submitted: boolean;
  id: any;
  list= [];
  constructor(private data: DataService,fb:FormBuilder,private keywordService:KeyWordService,private route:ActivatedRoute, private router:Router,private location: Location,private http:HttpClient,notifierService: NotifierService) { 
    
    this.notifier = notifierService;
    this.formEdit = fb.group({
    //  'keyword': ['' ],
      'value': [''] 
  });
  
   // this.keyword = this.formEdit.controls['keyword'];
 
    this.value = this.formEdit.controls['value'];
   
  }

  ngOnInit() {

    this.http.get<any[]>("http://127.0.0.1:8282/api/key-words", {headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))})
    .subscribe(
      res=>{
       console.log(res);
        for(var i=0;i<res.length;i++){
       
          let result=res[i].keyword;
         
          this.list.push(result);
        }
        this.list = this.list.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })
      },
      err=>{
        if(err.status==403)
        {
          this.router.navigate(['/contact'])
        }

      }


    )

    this.route.params.subscribe(param => {console.log(param.id)
      this.id= param.id;
      
      });
      console.log(this.id)
      let o=this.keywordService.find(this.id).subscribe(result =>{
        console.log(result.body);
   if(!this.checkEdit(result.body.authors) )
   {
     this.router.navigate(["/keyword"])
   }
   else{
    this.oldKeyword=result.body;
    this.prepareForm(this.oldKeyword);
    this.keywordVal=result.body["keyword"];
   }
       
      }
      ,
      err=>{
        if(err.status==403)
        {
          this.router.navigate(['/contact'])
        }

      }
      
      );


  }
  public onSubmit(values:Object):void {
    
    //console.log(values)
    let c=this.createFromForm();
    
   
    this.keywordService.update(c).subscribe(result=>{
    
      this.data.changeER("true");
      console.log(result);
      setTimeout(()=>{

        this.location.back();
      },1000)
      
    },
    error=>{
      if(error.status==403)
      {
        this.router.navigate(['/contact'])
      }
      else{  
        this.notifier.notify("error",error["error"].Message);

      }
    
      
    }
    )
      }
      private readonly notifier: NotifierService;
      keywordVal;
  prepareForm(result:any)
  {
   
    this.formEdit.controls['value'].setValue(result.value);
   
  }

  private createFromForm(): KeyWord {
    return {
      ...new KeyWord(),
      id: Number.parseInt(this.id.toString()),
      keyword: this.keywordVal,
      value: this.formEdit.get(['value']).value,
      
    };
  }

  previousState() {
       
    this.location.back();
  
  }


  checkEdit(data):Boolean
  {
  
    let splitData=data.split(",");
  
   try{
     
    let t=localStorage.getItem("rolesK").split(",");
    
 if(localStorage.getItem("rolesK") !="")
 {
    
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
   }
    
    
      }catch(e)
      {
        console.log(e)
      }   
  
  }


}
