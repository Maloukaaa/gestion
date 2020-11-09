import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';
let AjoutContactComponent = class AjoutContactComponent {
    constructor(localeService, fb, contactService, router) {
        this.localeService = localeService;
        this.contactService = contactService;
        this.router = router;
        this.colorTheme = 'theme-dark-blue';
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
        //console.log(this.locales)
        this.formAdd = fb.group({
            'nom': [''],
            'prenom': [''],
            'email': [''],
            'contactType': [''],
            'codeDouane': [''],
            'codePostal': [''],
            'datePContact': [],
            'fax': [''],
            'matriculeFiscale': [''],
            'secteurDactivite': ['this.secteurDactivite[1]'],
            'siteWeb': [''],
            'telBureau': [''],
            'ville': [''],
            'adresse': [''],
            'organisme': ['']
        });
        this.nom = this.formAdd.controls['nom'];
        this.prenom = this.formAdd.controls['prenom'];
        this.email = this.formAdd.controls['email'];
        this.contactType = this.formAdd.controls['contactType'];
        this.codeDouane = this.formAdd.controls['codeDouane'];
        this.codePostal = this.formAdd.controls['codePostal'];
        this.datePContact = this.formAdd.controls['datePContact'];
        this.fax = this.formAdd.controls['fax'];
        this.matriculeFiscale = this.formAdd.controls['matriculeFiscale'];
        this.secteurDactivite = this.formAdd.controls['secteurDactivite'];
        this.siteWeb = this.formAdd.controls['siteWeb'];
        this.telBureau = this.formAdd.controls['telBureau'];
        this.ville = this.formAdd.controls['ville'];
        this.adresse = this.formAdd.controls['adresse'];
        this.organisme = this.formAdd.controls['organisme'];
    }
    ngOnInit() {
    }
    onSubmit(values) {
        console.log(values);
        this.contactService.create(values).subscribe(Response => {
            console.log("add " + JSON.stringify(Response));
            this.router.navigate(["/contact"]);
        });
    }
    previousState() {
        //this.router.navigate(["/contact"])
        window.close();
    }
};
AjoutContactComponent = tslib_1.__decorate([
    Component({
        selector: 'app-ajout-contact',
        templateUrl: './ajout-contact.component.html',
        styleUrls: ['./ajout-contact.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [BsLocaleService, FormBuilder, ContactService, Router])
], AjoutContactComponent);
export { AjoutContactComponent };
//# sourceMappingURL=ajout-contact.component.js.map