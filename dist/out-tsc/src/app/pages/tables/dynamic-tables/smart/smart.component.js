import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let SmartComponent = class SmartComponent {
    constructor() {
        this.data = [];
        this.settings = {
            selectMode: 'single',
            hideHeader: false,
            hideSubHeader: false,
            actions: {
                columnTitle: 'Actions',
                add: true,
                edit: true,
                delete: true,
                custom: [],
                position: 'right' // left|right
            },
            add: {
                addButtonContent: '<h4 class="mb-1"><i class="fa fa-plus ml-3 text-success"></i></h4>',
                createButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
                cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
            },
            edit: {
                editButtonContent: '<i class="fa fa-pencil mr-3 text-primary"></i>',
                saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
                cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
                confirmDelete: true
            },
            noDataMessage: 'No data found',
            columns: {
                id: {
                    title: 'ID',
                    editable: false,
                    width: '60px',
                    type: 'html',
                    valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }
                },
                firstName: {
                    title: 'First Name',
                    type: 'string',
                    filter: true
                },
                lastName: {
                    title: 'Last Name',
                    type: 'string'
                },
                username: {
                    title: 'Username',
                    type: 'string'
                },
                email: {
                    title: 'E-mail',
                    type: 'string'
                },
                age: {
                    title: 'Age',
                    type: 'number'
                }
            },
            pager: {
                display: true,
                perPage: 10
            }
        };
        this.getData((data) => {
            this.data = data;
        });
    }
    getData(data) {
        const req = new XMLHttpRequest();
        req.open('GET', 'assets/data/users.json');
        req.onload = () => {
            data(JSON.parse(req.response));
        };
        req.send();
    }
    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        }
        else {
            event.confirm.reject();
        }
    }
    onRowSelect(event) {
        // console.log(event);
    }
    onUserRowSelect(event) {
        //console.log(event);   //this select return only one page rows
    }
    onRowHover(event) {
        //console.log(event);
    }
};
SmartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-smart',
        templateUrl: './smart.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], SmartComponent);
export { SmartComponent };
//# sourceMappingURL=smart.component.js.map