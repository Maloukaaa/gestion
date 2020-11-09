import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { LeafletMapsComponent } from './leaflet-maps/leaflet-maps.component';
export const routes = [
    { path: '', redirectTo: 'googlemaps', pathMatch: 'full' },
    { path: 'googlemaps', component: GoogleMapsComponent, data: { breadcrumb: 'Google Maps' } },
    { path: 'leafletmaps', component: LeafletMapsComponent, data: { breadcrumb: 'Leaflet Maps' } }
];
let MapsModule = class MapsModule {
};
MapsModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            AgmCoreModule,
            RouterModule.forChild(routes)
        ],
        declarations: [
            GoogleMapsComponent,
            LeafletMapsComponent
        ]
    })
], MapsModule);
export { MapsModule };
//# sourceMappingURL=maps.module.js.map