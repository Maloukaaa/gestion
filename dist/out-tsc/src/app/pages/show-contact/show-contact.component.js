import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ContactService } from '../service/contact.service';
let ShowContactComponent = class ShowContactComponent {
    constructor(route, contactService) {
        this.route = route;
        this.contactService = contactService;
    }
    ngOnInit() {
        //this.contactService.getContactById(this.route.snapshot.params['id']).subscribe(data => {});
    }
};
ShowContactComponent = tslib_1.__decorate([
    Component({
        selector: 'app-show-contact',
        templateUrl: './show-contact.component.html',
        styleUrls: ['./show-contact.component.scss'],
        providers: [ContactService]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute, ContactService])
], ShowContactComponent);
export { ShowContactComponent };
//# sourceMappingURL=show-contact.component.js.map