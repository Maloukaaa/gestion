import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { KeyWordService } from '../service/keyword.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import {KeyWord} from '../service/keyword'
@Component({
  selector: 'app-show-keyword',
  templateUrl: './show-keyword.component.html',
  styleUrls: ['./show-keyword.component.scss']
})
export class ShowKeywordComponent implements OnInit {
  oldKeyword:any;
  public formShow:FormGroup;
 // public keyword:AbstractControl;
 
  public value:AbstractControl;
  submitted: boolean;
  id: any;
  constructor(fb:FormBuilder,private keywordService:KeyWordService,private route:ActivatedRoute, private router:Router,private location: Location,private http:HttpClient) {  


    this.formShow = fb.group({
    //  'keyword': [{value :'',disabled: true} ],
     
      'value': [{value :'',disabled: true} ],
     
      
  });

  
  //this.keyword = this.formShow.controls['keyword'];
 
  this.value = this.formShow.controls['value'];
 

  }
  keywordVal:any;
  ngOnInit() {

    this.route.params.subscribe(param => {console.log(param.id)
      this.id= param.id;
      
      });
      console.log(this.id)
      let o=this.keywordService.find(this.id).subscribe(result =>{
        console.log(result.body["keyword"]);
   
        this.oldKeyword=result.body;
        this.prepareForm(this.oldKeyword);
        this.keywordVal=result.body["keyword"];
        console.log(this.keywordVal);
      });
  }


  prepareForm(result:any)
  {
    console.log(result.domaineDactivite);
  //  this.formShow.controls['keyword'].setValue(this.keywordVal);
    this.formShow.controls['value'].setValue(result.value);
   
  }

  private createFromForm(): KeyWord {
    return {
      ...new KeyWord(),
      id: Number.parseInt(this.id.toString()),
      keyword: this.keywordVal,
      value: this.formShow.get(['value']).value,
      
    };
  }

  previousState() {
       
    this.location.back();
    //window.close();
  }

  public onSubmit(values:Object):void {


    this.router.navigate(["edit-keyword/"+this.id])
      }

}
