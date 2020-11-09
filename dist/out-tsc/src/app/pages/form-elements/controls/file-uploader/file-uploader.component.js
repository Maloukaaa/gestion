import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let FileUploaderComponent = class FileUploaderComponent {
    fileChange(input) {
        const reader = new FileReader();
        if (input.files.length) {
            this.file = input.files[0].name;
        }
    }
    removeFile() {
        this.file = '';
    }
};
FileUploaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-file-uploader',
        encapsulation: ViewEncapsulation.None,
        templateUrl: './file-uploader.component.html',
        styleUrls: ['./file-uploader.component.scss']
    })
], FileUploaderComponent);
export { FileUploaderComponent };
//# sourceMappingURL=file-uploader.component.js.map