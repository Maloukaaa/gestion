import { HttpParams } from '@angular/common/http';
export const createRequestOption = (req) => {
    let options = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach(val => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};
//# sourceMappingURL=reques-util.js.map