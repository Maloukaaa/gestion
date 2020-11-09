import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
let UserInfoComponent = class UserInfoComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.personalForm = this.formBuilder.group({
            'salutation': [''],
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'gender': [''],
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'phone': ['', Validators.required],
            'zipcode': ['', Validators.required],
            'country': ['', Validators.required],
            'state': [''],
            'address': ['']
        });
    }
    onSubmit(values) {
        if (this.personalForm.valid) {
            // this.router.navigate(['pages/dashboard']);
        }
    }
};
UserInfoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-info',
        templateUrl: './user-info.component.html',
        styleUrls: ['./user-info.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], UserInfoComponent);
export { UserInfoComponent };
export function emailValidator(control) {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
//# sourceMappingURL=user-info.component.js.map