import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let MembershipService = class MembershipService {
    constructor(http) {
        this.http = http;
        this.url = "api/users";
    }
    getUsers() {
        return this.http.get(this.url);
    }
    addUser(user) {
        return this.http.post(this.url, user);
    }
    updateUser(user) {
        return this.http.put(this.url, user);
    }
    deleteUser(id) {
        return this.http.delete(this.url + "/" + id);
    }
};
MembershipService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], MembershipService);
export { MembershipService };
//# sourceMappingURL=membership.service.js.map