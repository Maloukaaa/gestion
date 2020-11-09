import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let EditorComponent = class EditorComponent {
    constructor() {
        this.ckeditorContent = '<div>Hey we are testing CKEditor</div>';
        this.config = {
            uiColor: '#F0F3F4',
            height: '350',
            extraPlugins: 'divarea'
        };
    }
    onChange(event) {
        setTimeout(() => {
            this.ckeditorContent = event;
        });
    }
    onReady(event) { }
    onFocus(event) {
        console.log("editor is focused");
    }
    onBlur(event) {
    }
};
EditorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editor',
        templateUrl: './editor.component.html',
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [])
], EditorComponent);
export { EditorComponent };
//# sourceMappingURL=editor.component.js.map