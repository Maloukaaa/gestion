import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import moment from 'moment';
import { DATE_FORMAT } from '../input.contact';
import { map } from 'rxjs/operators';
//import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from './reques-util';
let ContactService = class ContactService {
    constructor(http) {
        this.http = http;
        this.resourceUrl = 'http://localhost:8282/api/contacts';
    }
    create(contact) {
        let token = localStorage.getItem("token");
        let headers1 = new HttpHeaders().append('Authorization', token);
        const copy = this.convertDateFromClient(contact);
        return this.http
            .post(this.resourceUrl, copy, { headers: headers1, observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    update(contact) {
        const copy = this.convertDateFromClient(contact);
        let token = localStorage.getItem("token");
        let headers1 = new HttpHeaders().append('Authorization', token);
        return this.http
            .put(this.resourceUrl, copy, { headers: headers1, observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    find(id) {
        let token = localStorage.getItem("token");
        let headers1 = new HttpHeaders().append('Authorization', token);
        return this.http
            .get(`${this.resourceUrl}/${id}`, { headers: headers1, observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    query(req) {
        let token = localStorage.getItem("token");
        let headers1 = new HttpHeaders().append('Authorization', token);
        const options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, { headers: headers1, params: options, observe: 'response' })
            .pipe(map((res) => this.convertDateArrayFromServer(res)));
    }
    delete(id) {
        let token = localStorage.getItem("token");
        let headers1 = new HttpHeaders().append('Authorization', token);
        return this.http.delete(`${this.resourceUrl}/${id}`, { headers: headers1, observe: 'response' });
    }
    convertDateFromClient(contact) {
        const copy = Object.assign({}, contact, {
            datePContact: contact.datePContact != null ? moment(contact.datePContact).format(DATE_FORMAT) : null
        });
        return copy;
    }
    convertDateFromServer(res) {
        console.log("res.body.datePContact");
        console.log(res.body.datePContact);
        if (res.body) {
            res.body.datePContact = res.body.datePContact != null ? moment(res.body.datePContact) : null;
        }
        return res;
    }
    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((contact) => {
                console.log("res.body.datePContact");
                console.log(contact.datePContact);
                contact.datePContact = contact.datePContact != null ? moment(contact.datePContact) : null;
            });
        }
        return res;
    }
    getContactByType(typeC) {
        let token = localStorage.getItem("token");
        let headers1 = new HttpHeaders().append('Authorization', token);
        let params = new HttpParams().set("type", typeC);
        if (headers1.get("Authorization") != null) {
            return this.http.get('http://localhost:8282/api/contactsByType?type=' + typeC, { headers: headers1 });
        }
    }
    getToken(user) {
        this.isItLoggedIn = true;
        return this.http.post('http://localhost:8282/api/Authenticate', user, { responseType: "text" });
    }
    isLoggedIn() {
        if (this.loadToken() !== '' && this.loadToken() !== null) {
            this.isItLoggedIn = true;
        }
        return this.isItLoggedIn;
    }
    loadToken() {
        this.currentToken = localStorage.getItem("token");
        return this.currentToken;
    }
};
ContactService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ContactService);
export { ContactService };
//# sourceMappingURL=contact.service.js.map