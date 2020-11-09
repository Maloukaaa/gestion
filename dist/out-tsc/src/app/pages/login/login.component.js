import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { TranslateService } from '@ngx-translate/core';
let LoginComponent = class LoginComponent {
    constructor(router, fb, contactService, translate) {
        this.contactService = contactService;
        this.translate = translate;
        translate.use("fr");
        sessionStorage.setItem("locale", "fr");
        this.router = router;
        this.form = fb.group({
            'username': [''],
            'password': [''],
            'application': ['']
        });
        //Validators.compose([Validators.required, CustomValidators.email])
        // Validators.compose([Validators.required, Validators.minLength(6)])
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
        this.application = this.form.controls['application'];
    }
    onSubmit(values) {
        console.log(values["username"]);
        this.contactService.getToken(values).subscribe(response => {
            console.log(JSON.stringify(response));
            let token = response;
            console.log(this.currentToken);
            if (token != "" && token != null && token != undefined) {
                // let c:string=token.substring(token.indexOf(" "),token.length-2)
                this.currentToken = response;
                localStorage.setItem("username", values["username"]);
                localStorage.setItem("token", token);
                this.router.navigate(['/contact']);
            }
            else {
                this.currentToken = "error";
            }
        }, err => {
            console.log(err);
            if (err.status == 500) {
                this.router.navigate(['']);
                this.currentToken = "error";
            }
        });
    }
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [Router, FormBuilder, ContactService, TranslateService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map