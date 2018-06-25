import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ScoraxchangeHomePageComponent } from './components/Common/landing-pages/scoraxchange-landing-page/scoraxchange-landing-page.component';
import { ScoraXchangeHomeComponent } from './modules/scora-xchange-home/scora-xchange-home.component';
import { CampusLandingPageComponent } from './components/Common/landing-pages/campus-landing-page/campus-landing-page.component';
import { CompanyLandingPageComponent } from './components/Common/landing-pages/company-landing-page/company-landing-page.component';
import { ScoratechLandingPageComponent } from './components/Common/landing-pages/scoratech-landing-page/scoratech-landing-page.component';
import { CampusDispalyProfileComponent } from './components/Common/profile/campus-display-profile.component';
import {  CompanyDispalyProfileComponent } from './components/Common/profile/company-dispaly-profile.component';
import { StudentProfileComponent } from './components/Common/student-profile/student-profile.component';
import { TermsOfUseComponent } from './components/Common/landing-pages/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './components/Common/landing-pages/privacy-policy/privacy-policy.component';
import {PageNotFoundComponent} from './components/Common/not-found/page-not-found/page-not-found.component';

export const scoraHomeRoutes: Routes = [
 
    { path: '', redirectTo: '/scoraLandingPage', pathMatch: 'full' },
  { path: 'scoraLandingPage', component: ScoratechLandingPageComponent},
  { path: 'scoraHeader', component: ScoraXchangeHomeComponent},
  { path: 'campusLandingPage', component: CampusLandingPageComponent},
  { path: 'comapanyLandingPage', component: CompanyLandingPageComponent},
  { path: 'campusListProfile/:id', component: CampusDispalyProfileComponent},
  { path: 'companyListProfile/:id', component: CompanyDispalyProfileComponent },
  { path: 'studentProfile/:id', component: StudentProfileComponent},
  { path: 'termsOfUse', component: TermsOfUseComponent},
  { path: 'privacyPolicy', component: PrivacyPolicyComponent},
  { path: 'pageNotFound', component: PageNotFoundComponent },
  // { path: '**', redirectTo: 'pageNotFound' },

];

export const scoraHomeRouter: ModuleWithProviders = RouterModule.forRoot(scoraHomeRoutes);