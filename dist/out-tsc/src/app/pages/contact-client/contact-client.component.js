import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
let ContactClientComponent = class ContactClientComponent {
    constructor(contactService, router) {
        this.contactService = contactService;
        this.router = router;
        this.user = {
            "application": "",
            "password": "HPsk5",
            "username": "fairouz.jaafar"
        };
    }
    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift({
            location: 'before',
        }, {
            location: 'after',
            widget: 'dxButton',
            options: {
                icon: 'add',
                onClick: this.ouvrir.bind(this)
            }
        }, {
            location: 'after',
            widget: 'dxButton',
            options: {
                icon: 'refresh',
                onClick: this.refreshDataGrid.bind(this)
            }
        });
    }
    refreshDataGrid() {
        this.dataGrid.instance.refresh();
    }
    ouvrir(e) {
        window.open('ajout-contact');
    }
    handleSuccessfulResponse(response) {
        console.log(response);
        this.ContactClient = response;
    }
    ngOnInit() {
        this.contactService.getContactByType("Client").subscribe(response => { this.handleSuccessfulResponse(response); }, err => {
            console.log(err);
            if (err.status == 403) {
                this.router.navigate(['']);
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(DxDataGridComponent, { static: false }),
    tslib_1.__metadata("design:type", DxDataGridComponent)
], ContactClientComponent.prototype, "dataGrid", void 0);
ContactClientComponent = tslib_1.__decorate([
    Component({
        selector: 'app-contact-client',
        templateUrl: './contact-client.component.html',
        styleUrls: ['./contact-client.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ContactService, Router])
], ContactClientComponent);
export { ContactClientComponent };
//# sourceMappingURL=contact-client.component.js.map