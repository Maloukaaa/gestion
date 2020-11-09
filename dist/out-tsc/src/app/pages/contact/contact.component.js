import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';
import 'devextreme-intl';
import { Router } from '@angular/router';
//import { locale, loadMessages, formatMessage } from 'devextreme/localization';
//import deMessages from 'devextreme/dist/js/localization/dx.messages.fr.js';
const ITEMS_PER_PAGE = 12;
let ContactComponent = class ContactComponent {
    constructor(contactService, translate, router) {
        this.contactService = contactService;
        this.translate = translate;
        this.router = router;
        this.popupVisible = false;
        this.currentDate = new Date();
        this.day = this.currentDate.getUTCDate();
        this.month = this.currentDate.getMonth();
        this.year = this.currentDate.getFullYear();
        this.today = {
            "year": this.year,
            "month": this.month,
            "day": this.day
        };
        this.contacts = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        /* loadMessages(deMessages);
         this.locale=sessionStorage.getItem("locale");
         if(this.locale!="" && this.locale!=null && this.locale!=undefined){
         console.log(this.locale);
         locale(this.locale);
         translate.use(this.locale);
       }
       else{
         locale("fr");
         translate.use("fr");
       }*/
    }
    ;
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
    ouvrir(e) {
        window.open('ajout-contact');
    }
    /* useLanguage(language: string) {
   
      sessionStorage.setItem("locale", language);
       parent.document.location.reload();
   }
 */
    refreshDataGrid() {
        this.dataGrid.instance.refresh();
    }
    loadAll() {
        this.contactService
            .query({
            //page: this.page,
            size: this.itemsPerPage,
        })
            .subscribe((res) => {
            return this.paginateContacts(res.body, res.headers);
        }, err => {
            console.log(err);
            if (err.status == 403) {
                this.router.navigate(['']);
            }
        }
        //(res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    show2() {
        document.getElementById("btn").click();
    }
    showInfo() {
        this.popupVisible = true;
    }
    ;
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    getMaxID() {
        console.log(this.maxID);
        return ++this.maxID;
    }
    setData(data) {
        this.contacts = data;
        console.log(" 1 " + this.contacts);
    }
    paginateContacts(data, headers) {
        var D1 = data[0].datePContact;
        console.log(data);
        this.maxID = data[data.length - 1].id;
        console.log((this.maxID));
        this.dataSource = data;
        this.setData(data);
        console.log(headers);
    }
    get todays() {
        return new Date();
    }
    ngOnInit() {
        this.model2 = this.today;
        this.loadAll();
    }
    cloneIconClick(e) {
        var clonedItem = Object.assign({}, e.row.data, { ID: ++this.maxID });
        this.contacts.splice(e.row.rowIndex, 0, clonedItem);
        //e.event.preventDefault();
    }
    ContactsSplice(row, clone, data) {
        const contacts2 = data;
        contacts2.splice(row, 0, clone);
    }
    parse(header) {
        if (header.length === 0) {
            throw new Error('input must not be of zero length');
        }
        const parts = header.split(',');
        const links = {};
        parts.forEach(p => {
            const section = p.split(';');
            if (section.length !== 2) {
                throw new Error('section could not be split on ";"');
            }
            const url = section[0].replace(/<(.*)>/, '$1').trim();
            const queryString = {};
            url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3));
            let page = queryString.page;
            if (typeof page === 'string') {
                page = parseInt(page, 10);
            }
            const name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = page;
        });
        return links;
    }
};
tslib_1.__decorate([
    ViewChild(DxDataGridComponent, { static: false }),
    tslib_1.__metadata("design:type", DxDataGridComponent)
], ContactComponent.prototype, "dataGrid", void 0);
ContactComponent = tslib_1.__decorate([
    Component({
        selector: 'app-contact',
        templateUrl: './contact.component.html',
        styleUrls: ['./contact.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ContactService, TranslateService, Router])
], ContactComponent);
export { ContactComponent };
//# sourceMappingURL=contact.component.js.map