import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';
let ContactPartenaireComponent = class ContactPartenaireComponent {
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
        ;
        this.ContactPartenaire = response;
    }
    ngOnInit() {
        this.contactService.getContactByType("Partenaire").subscribe(response => { this.handleSuccessfulResponse(response); }, err => {
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
], ContactPartenaireComponent.prototype, "dataGrid", void 0);
ContactPartenaireComponent = tslib_1.__decorate([
    Component({
        selector: 'app-contact-partenaire',
        templateUrl: './contact-partenaire.component.html',
        styleUrls: ['./contact-partenaire.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ContactService, Router])
], ContactPartenaireComponent);
export { ContactPartenaireComponent };
//# sourceMappingURL=contact-partenaire.component.js.map