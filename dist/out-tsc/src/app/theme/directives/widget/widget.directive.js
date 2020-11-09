import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
import 'widgster';
let WidgetDirective = class WidgetDirective {
    constructor(el) {
        this.$el = jQuery(el.nativeElement);
        jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';
        jQuery(document).on('close.widgster', (e) => {
            let $colWrap = jQuery(e.target).closest(' [class*="col-"]:not(.widget-container)');
            if (!$colWrap.find('.widget').not(e.target).length) {
                $colWrap.remove();
            }
        });
        jQuery(document).on("fullscreened.widgster", (e) => {
            jQuery(e.target).find('div.widget-body').addClass('card-block-scrolling');
        }).on("restored.widgster", (e) => {
            jQuery(e.target).find('div.widget-body').removeClass('card-block-scrolling');
        });
    }
    ngOnInit() {
        this.$el.widgster();
    }
};
WidgetDirective = tslib_1.__decorate([
    Directive({
        selector: '[widget]'
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], WidgetDirective);
export { WidgetDirective };
//# sourceMappingURL=widget.directive.js.map