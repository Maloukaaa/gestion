import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
let ContactFournisseurComponent = class ContactFournisseurComponent {
    constructor(contactService, router) {
        this.contactService = contactService;
        this.router = router;
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
        this.contacts = response;
        this.ContactFournisseur = response;
    }
    ngOnInit() {
        this.contactService.getContactByType("Fournisseur").subscribe(response => { this.handleSuccessfulResponse(response); }, err => {
            console.log(err);
            if (err.status == 403) {
                this.router.navigate(['']);
            }
        });
        //  console.log("contactService============ " +this.contactService)
    }
};
tslib_1.__decorate([
    ViewChild(DxDataGridComponent, { static: false }),
    tslib_1.__metadata("design:type", DxDataGridComponent)
], ContactFournisseurComponent.prototype, "dataGrid", void 0);
ContactFournisseurComponent = tslib_1.__decorate([
    Component({
        selector: 'app-contact-fournisseur',
        templateUrl: './contact-fournisseur.component.html',
        styleUrls: ['./contact-fournisseur.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ContactService, Router])
], ContactFournisseurComponent);
export { ContactFournisseurComponent };
//# sourceMappingURL=contact-fournisseur.component.js.map