import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let TruncatePipe = class TruncatePipe {
    transform(value, args) {
        let limit = args > 0 ? parseInt(args) : 10;
        return value.length > limit ? value.substring(0, limit) + '...' : value;
    }
};
TruncatePipe = tslib_1.__decorate([
    Pipe({
        name: 'truncate'
    })
], TruncatePipe);
export { TruncatePipe };
//# sourceMappingURL=truncate.pipe.js.map