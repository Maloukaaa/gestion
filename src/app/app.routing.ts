import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactFournisseurComponent } from './pages/contact-fournisseur/contact-fournisseur.component';
import { ContactClientComponent } from './pages/contact-client/contact-client.component';
import { ContactPartenaireComponent } from './pages/contact-partenaire/contact-partenaire.component';
import { AjoutContactComponent } from './pages/ajout-contact/ajout-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ShowContactComponent } from './pages/show-contact/show-contact.component';
import { LoginComponent } from './pages/login/login.component';
import {AuthGuardService} from "./auth-guard.service";
import { ImportModalComponent } from './import-modal/import-modal.component';
import { FusionContactComponent } from './fusion-contact/fusion-contact.component';
import { AdministrationComponent } from './administration/administration.component';
import { KeywordsComponent } from './keywords/keywords.component';
import {AddKeywordComponent} from "../app/add-keyword/add-keyword.component"
import { EditKeywordComponent } from './edit-keyword/edit-keyword.component';
import { ShowKeywordComponent } from './show-keyword/show-keyword.component';
import { ImportationErreurComponent } from './importation-erreur/importation-erreur.component';
import { AdministrationKeywordComponent } from './administration-keyword/administration-keyword.component';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  {
    path: '', 
    component: PagesComponent,
    
    children:[
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Acceuil'}},
      { path: 'import', component: ImportModalComponent, data: { breadcrumb: ' Import'} },
      { path: 'contact', component: ContactComponent, data: { breadcrumb: ' Contact'}},
      { path: 'contactFournisseur', component: ContactFournisseurComponent, data: { breadcrumb: ' Fournisseurs'}},
      { path: 'contactClient', component: ContactClientComponent, data: { breadcrumb: ' Clients'}},
      { path: 'contactPartenaire', component: ContactPartenaireComponent, data: { breadcrumb: ' Partenaires'}},
      { path: 'ajout-contact', component: AjoutContactComponent, data: { breadcrumb: ' Ajouter Contact'}},
      { path: 'edit-contact/:id', component: EditContactComponent, data: { breadcrumb: ' Modifier Contact'}},
      { path: 'show-contact/:id', component: ShowContactComponent, data: { breadcrumb: ' Afficher Contact'}},
      { path: 'fusion-contact', component: FusionContactComponent, data: { breadcrumb: ' Fusionner Contact'}},
      { path: 'corbeille', component: AdministrationComponent, data: { breadcrumb: ' Corbeille Contact'}},
      { path: 'corbeilleK', component: AdministrationKeywordComponent, data: { breadcrumb: ' Corbeille Keyword'}},
      { path: 'keyword', component: KeywordsComponent, data: { breadcrumb: ' KeyWords'}},
      { path: 'ajout-keyword', component: AddKeywordComponent, data: { breadcrumb: ' AddKeyWords'}},
      { path: 'show-keyword/:id', component: ShowKeywordComponent, data: { breadcrumb: ' ShowKeyWords'}},
      { path: 'edit-keyword/:id', component: EditKeywordComponent, data: { breadcrumb: ' EditKeyWords'}},
      { path: 'ir', component: ImportationErreurComponent, data: { breadcrumb: ' EditKeyWords'}}
    ],

  },
  
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  // preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
  // useHash: true
});