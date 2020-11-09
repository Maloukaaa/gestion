import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactFournisseurComponent } from './pages/contact-fournisseur/contact-fournisseur.component';
import { ContactClientComponent } from './pages/contact-client/contact-client.component';
import { ContactPartenaireComponent } from './pages/contact-partenaire/contact-partenaire.component';
import { AjoutContactComponent } from './pages/ajout-contact/ajout-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ShowContactComponent } from './pages/show-contact/show-contact.component';
import { AuthGuardService } from "./auth-guard.service";
export const routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: ContactComponent, data: { breadcrumb: ' Contact' } },
            { path: 'contact', component: ContactComponent, data: { breadcrumb: ' Contact' }, canActivate: [AuthGuardService] },
            { path: 'contactFournisseur', component: ContactFournisseurComponent, data: { breadcrumb: ' Fournisseurs' }, canActivate: [AuthGuardService] },
            { path: 'contactClient', component: ContactClientComponent, data: { breadcrumb: ' Clients' }, canActivate: [AuthGuardService] },
            { path: 'contactPartenaire', component: ContactPartenaireComponent, data: { breadcrumb: ' Partenaires' }, canActivate: [AuthGuardService] },
            { path: 'ajout-contact', component: AjoutContactComponent, data: { breadcrumb: ' Ajouter Contact' }, canActivate: [AuthGuardService] },
            { path: 'edit-contact/:id', component: EditContactComponent, data: { breadcrumb: ' Modifier Contact' }, canActivate: [AuthGuardService] },
            { path: 'show-contact/:id', component: ShowContactComponent, data: { breadcrumb: ' Afficher Contact' }, canActivate: [AuthGuardService] }
        ],
    },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    { path: '**', component: NotFoundComponent }
];
export const routing = RouterModule.forRoot(routes, {
// preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
// useHash: true
});
//# sourceMappingURL=app.routing.js.map