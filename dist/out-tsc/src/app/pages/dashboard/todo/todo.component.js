import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { TodoService } from './todo.service';
let TodoComponent = class TodoComponent {
    constructor(_todoService) {
        this._todoService = _todoService;
        this.newTodoText = '';
        this.todoList = this._todoService.getTodoList();
    }
    getNotDeleted() {
        return this.todoList.filter((item) => {
            return !item.deleted;
        });
    }
    addToDoItem($event) {
        if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
            this.todoList.unshift({
                text: this.newTodoText
            });
            this.newTodoText = '';
        }
    }
};
TodoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-todo',
        templateUrl: './todo.component.html',
        styleUrls: ['./todo.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [TodoService]
    }),
    tslib_1.__metadata("design:paramtypes", [TodoService])
], TodoComponent);
export { TodoComponent };
//# sourceMappingURL=todo.component.js.map