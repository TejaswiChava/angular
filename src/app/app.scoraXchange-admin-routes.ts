import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ScoraXchangeAdminComponent } from './modules/scora-xchange-admin/scora-xchange-admin.component';
import { ScoraEnrollCampusComponent } from './components/scora-admin/scora-enroll-campus/scora-enroll-campus.component';
import { CampusService } from './services/common/landing-pages/campus-landing/campus.service';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';

export const scoraAdminRoutes: Routes = [

    {
        path: 'scora', component:ScoraXchangeAdminComponent,canActivate: [CampusService],
        children: [
            {path: 'enroll', component: ScoraEnrollCampusComponent},
            { path: 'notifications', component: NotificationsComponent},
        ]
    }
];
export const scoraAdminRoute: ModuleWithProviders = RouterModule.forRoot(scoraAdminRoutes);