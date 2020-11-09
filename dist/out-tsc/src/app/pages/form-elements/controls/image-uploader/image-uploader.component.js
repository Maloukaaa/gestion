import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let ImageUploaderComponent = class ImageUploaderComponent {
    fileChange(input) {
        const reader = new FileReader();
        if (input.files.length) {
            const file = input.files[0];
            reader.onload = () => {
                this.image = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
    removeImage() {
        this.image = '';
    }
};
ImageUploaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-image-uploader',
        encapsulation: ViewEncapsulation.None,
        templateUrl: './image-uploader.component.html',
        styleUrls: ['./image-uploader.component.scss']
    })
], ImageUploaderComponent);
export { ImageUploaderComponent };
//# sourceMappingURL=image-uploader.component.js.map