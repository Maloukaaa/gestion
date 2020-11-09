import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ContactService } from '../app/pages/service/contact.service';
let AuthGuardService = class AuthGuardService {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        this.currentToken = localStorage.getItem("token");
        console.log(this.currentToken + " auth ga");
        if (this.currentToken == '' || this.currentToken == null) {
            console.log("ussss ");
            this.router.navigate(['']);
        }
        return true;
    }
};
AuthGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ContactService, Router])
], AuthGuardService);
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map