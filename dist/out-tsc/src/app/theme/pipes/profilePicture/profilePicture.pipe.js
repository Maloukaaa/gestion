import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let ProfilePicturePipe = class ProfilePicturePipe {
    transform(input, ext = 'jpg') {
        return '../assets/img/profile/' + input + '.' + ext;
    }
};
ProfilePicturePipe = tslib_1.__decorate([
    Pipe({ name: 'profilePicture' })
], ProfilePicturePipe);
export { ProfilePicturePipe };
//# sourceMappingURL=profilePicture.pipe.js.map