import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
let MultipleImageUploaderComponent = class MultipleImageUploaderComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.images = [];
    }
    fileChange(input) {
        this.readFiles(input.files);
    }
    readFile(file, reader, callback) {
        reader.onload = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }
    readFiles(files, index = 0) {
        let reader = new FileReader();
        if (index in files) {
            this.readFile(files[index], reader, (result) => {
                this.images.push(result);
                this.readFiles(files, index + 1);
            });
        }
        else {
            this.changeDetectorRef.detectChanges();
        }
    }
    removeImage(index) {
        this.images.splice(index, 1);
    }
};
MultipleImageUploaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-multiple-image-uploader',
        encapsulation: ViewEncapsulation.None,
        templateUrl: './multiple-image-uploader.component.html',
        styleUrls: ['./multiple-image-uploader.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
], MultipleImageUploaderComponent);
export { MultipleImageUploaderComponent };
//# sourceMappingURL=multiple-image-uploader.component.js.map