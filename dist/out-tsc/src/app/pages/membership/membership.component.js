import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from './membership.model';
import { MembershipService } from './membership.service';
import { MenuService } from '../../theme/components/menu/menu.service';
let MembershipComponent = class MembershipComponent {
    constructor(fb, toastrService, membershipService, menuService, modalService) {
        this.fb = fb;
        this.toastrService = toastrService;
        this.membershipService = membershipService;
        this.menuService = menuService;
        this.modalService = modalService;
        this.type = 'grid';
        this.genders = ['male', 'female'];
        this.menuSelectSettings = {
            enableSearch: true,
            checkedStyle: 'fontawesome',
            buttonClasses: 'btn btn-secondary btn-block',
            dynamicTitleMaxItems: 0,
            displayAllSelectedText: true,
            showCheckAll: true,
            showUncheckAll: true
        };
        this.menuSelectTexts = {
            checkAll: 'Select all',
            uncheckAll: 'Unselect all',
            checked: 'menu item selected',
            checkedPlural: 'menu items selected',
            searchPlaceholder: 'Find menu item...',
            defaultTitle: 'Select menu items for user',
            allSelected: 'All selected',
        };
        this.menuSelectOptions = [];
        this.menuItems = this.menuService.getVerticalMenuItems();
        this.menuItems.forEach(item => {
            let menu = {
                id: item.id,
                name: item.title
            };
            this.menuSelectOptions.push(menu);
        });
    }
    ngOnInit() {
        this.getUsers();
        this.form = this.fb.group({
            id: null,
            username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            profile: this.fb.group({
                name: null,
                surname: null,
                birthday: null,
                gender: null,
                image: null
            }),
            work: this.fb.group({
                company: null,
                position: null,
                salary: null
            }),
            contacts: this.fb.group({
                email: null,
                phone: null,
                address: null
            }),
            social: this.fb.group({
                facebook: null,
                twitter: null,
                google: null
            }),
            settings: this.fb.group({
                isActive: null,
                isDeleted: null,
                registrationDate: null,
                joinedDate: null
            }),
            menuIds: null
        });
    }
    getUsers() {
        this.membershipService.getUsers().subscribe(users => this.users = users);
    }
    addUser(user) {
        this.membershipService.addUser(user).subscribe(user => {
            this.getUsers();
        });
    }
    updateUser(user) {
        this.membershipService.updateUser(user).subscribe(user => {
            this.getUsers();
        });
    }
    deleteUser(user) {
        this.membershipService.deleteUser(user.id).subscribe(result => this.getUsers());
    }
    toggle(type) {
        this.type = type;
    }
    openMenuAssign(event) {
        let parent = event.target.parentNode;
        while (parent) {
            parent = parent.parentNode;
            if (parent.classList.contains('content')) {
                parent.classList.add('flipped');
                parent.parentNode.parentNode.classList.add('z-index-1');
                break;
            }
        }
    }
    closeMenuAssign(event) {
        let parent = event.target.parentNode;
        while (parent) {
            parent = parent.parentNode;
            if (parent.classList.contains('content')) {
                parent.classList.remove('flipped');
                parent.parentNode.parentNode.classList.remove('z-index-1');
                break;
            }
        }
    }
    assignMenuItemsToUser(user) {
        this.updateUser(user);
        sessionStorage.setItem('userMenuItems', JSON.stringify(user.menuIds));
        this.toastrService.success('Please, logout and login to see result.', 'Successfully assigned !');
    }
    openModal(modalContent, user) {
        if (user) {
            this.user = user;
            this.form.setValue(user);
            this.genderOption = user.profile.gender;
        }
        else {
            this.user = new User();
            this.user.profile = new UserProfile();
            this.user.work = new UserWork();
            this.user.contacts = new UserContacts();
            this.user.social = new UserSocial();
            this.user.settings = new UserSettings();
        }
        this.modalRef = this.modalService.open(modalContent, { container: '.app' });
        this.modalRef.result.then((result) => {
            this.form.reset();
            this.genderOption = null;
        }, (reason) => {
            this.form.reset();
            this.genderOption = null;
        });
    }
    closeModal() {
        this.modalRef.close();
    }
    onSubmit(user) {
        if (this.form.valid) {
            if (user.id) {
                this.updateUser(user);
            }
            else {
                this.addUser(user);
            }
            this.modalRef.close();
        }
    }
};
MembershipComponent = tslib_1.__decorate([
    Component({
        selector: 'app-membership',
        templateUrl: './membership.component.html',
        styleUrls: ['./membership.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MembershipService, MenuService]
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ToastrService,
        MembershipService,
        MenuService,
        NgbModal])
], MembershipComponent);
export { MembershipComponent };
//# sourceMappingURL=membership.component.js.map