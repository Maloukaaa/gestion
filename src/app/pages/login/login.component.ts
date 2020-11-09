import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ContactService } from '../service/contact.service';
import {TranslateService} from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeyWordService } from 'src/app/service/keyword.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public router: Router;
  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public application:AbstractControl;
  currentToken: string;
  isItLoggedIn: boolean;
total;
  usernameF:String;
  constructor(private keywordService:KeyWordService,router:Router, fb:FormBuilder,protected contactService: ContactService,private translate: TranslateService,private http:HttpClient) {



    translate.use("fr");  
    sessionStorage.setItem("locale","fr");
    this.router = router;
      this.form = fb.group({
          'username': ['',Validators.required ],
          'password': ['',Validators.required ],
          'application': ['CM' ]

      });
      //Validators.compose([Validators.required, CustomValidators.email])
     // Validators.compose([Validators.required, Validators.minLength(6)])
      this.username = this.form.controls['username'];
      this.password = this.form.controls['password'];
      this.application = this.form.controls['application'];
      if (contactService.isLoggedIn()) {
        

        this.router.navigate(['/contact']);
    }
  }

  public onSubmit(values:Object):void {
    this.router.navigate(['/contact'])
  }
    /*this.contactService.getToken(values).subscribe(
        response =>{
        let token=response;*/
        
      


      //if (token!="" && token!=null && token!=undefined) {
      
       // let c:string=token.substring(token.indexOf(" "),token.length-2)
     /*  this.currentToken=response;
       let d= new Date()
       localStorage.setItem("time",d.toString());
       localStorage.setItem("username",values["username"]);
         localStorage.setItem("token",token);
        this.http.get( "http://127.0.0.1:8282/api/total",{headers: new HttpHeaders().set("Authorization", localStorage.getItem("token"))}).subscribe(
          res=>{
           
           let total=res["result"]["total"][0];
          localStorage.setItem("total",total);
           
          }
    
    
        )
        
        this.keywordService.getToken(values).subscribe(
          res=>{
            console.log("ress!!!")
            if(res!=""&& res!=null){
              localStorage.setItem("tokenKeyword",res);
              this.keywordService.getRole().subscribe(result => {
                localStorage.setItem("rolesK",result.body["roles"]);
                localStorage.setItem("profilesK",result.body["profiles"]);
             
               
              });

            }
            


          }


        )

        this.contactService.getRole().subscribe(result => {
          localStorage.setItem("roles",result.body["roles"]);
          localStorage.setItem("profiles",result.body["profiles"]);
       
         
        });
        
         setTimeout(()=>{ this.router.navigate(['/contact'])},100)
    }
    else
    {
      this.currentToken="error";
    }
},
err => {
  
 
  if(err.status==500){
    this.router.navigate(['']);
  this.currentToken="error";}
}
       );*/
      
  //}
  ngOnInit(): void {
    this.translate.use("fr");  
    sessionStorage.setItem("locale","fr");
  }

  ngAfterViewInit(){
    this.translate.use("fr");  
    sessionStorage.setItem("locale","fr");
      document.getElementById('preloader').classList.add('hide');                 
  }




}
