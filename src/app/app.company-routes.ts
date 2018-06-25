import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CampusService } from './services/common/landing-pages/campus-landing/campus.service';
import { JobRoleComponent } from './components/company/ControlData/job-role/jobrole.component';
import { MasterComponent } from './modules/campus/master/master.component';
import { CompaniesComponent } from './components/company/MasterData/companies/companies.component';

import { OrganizationComponent } from './components/company/MasterData/organization/organization.component';

import { ControlDataComponent } from './modules/company/control-data/control-data.component';
import { CompensationPackageComponent } from './components/company/ControlData/compensation-package/compensation-package.component';

// Dashboard
import { DriveComponent } from './components/company/drive/drive.component';
import { EventComponent } from './components/company/event/event.component';
import { DriveListViewComponent } from './components/company/drive/drive-list-view/drive-list-view.component';
import { CompanyComponent } from './modules/company/company.component';
import { CompanyDashboardProfileComponent } from './components/company/other/company-dashboard-profile/company-dashboard-profile.component';
import { CompanyDispalyProfileComponent } from './components/Common/profile/company-dispaly-profile.component';
import { CompanyProfileComponent } from './components/shared/my-profile/company-profile/company-profile.component';
import { CompanySearchComponent } from './components/shared/widgets/company-search/company-search.component';
import { CompanyDataUploadComponent } from './components/company/company-data-upload/company-data-upload.component';
import { CampusListComponent } from './components/company/ControlData/campus-list/campus-list.component';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';
import { CreateCampusDriveComponent } from './components/campus/campus-drive/create-campus-drive/create-campus-drive.component';
import { CreateDriveComponent } from './components/company/drive/create-drive/create-drive.component';
import { CompanyHomeDashboardComponent } from './components/company/other/company-home-dashboard.component';
import { CampusListSearchComponent } from './components/shared/widgets/campus-list-search/campus-list-search.component';
import { RecruitmentComponent } from './modules/company/recruitment/recruitment.component';
// Profile
import { AboutCompanyComponent } from './components/Common/profile/about/about.component';
import { CreateEventComponent } from './components/company/event/create-event/create-event.component';
import {NotFoundComponent} from './components/Common/not-found/not-found.component';

export const router: Routes = [

  { path: 'company', component: CompanyComponent, canActivate: [CampusService],
    // {path: 'company', component: CompanyComponent,
    children: [
      {
        path: 'companyMaster', component: MasterComponent,
        children: [
          { path: 'companies', component: CompaniesComponent },
          { path: 'organization', component: OrganizationComponent },
        ]
      },
      {
        path: 'recruitment', component: RecruitmentComponent,
        children: [
          {
            path: 'employerDrive', component: DriveComponent,
            children: [
              { path: 'viewList', component: DriveListViewComponent },
    
            ]
          },
          { path: 'employerEvent', component: EventComponent },
        ]
      },
      {
        path: 'controlData', component: ControlDataComponent,
        children: [
          { path: 'compensationPackage', component: CompensationPackageComponent },
          { path: 'jobrole', component: JobRoleComponent },
          { path: 'campusList', component: CampusListComponent }
        ]
      },
      // {
      //   path: 'employerDrive', component: DriveComponent,
      //   children: [
      //     { path: 'viewList', component: DriveListViewComponent },

      //   ]
      // },
    //  { path: 'employerEvent', component: EventComponent },
      { path: 'companyDashboardProfile', component: CompanyDashboardProfileComponent },
      { path: 'companyProfile', component: AboutCompanyComponent },
      { path: 'companyListProfile', component: CompanyDispalyProfileComponent },
      { path: 'dataUpload', component: CompanyDataUploadComponent },
      { path: 'myProfile', component: CompanyProfileComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'createDrive', component: CreateDriveComponent },
      { path: 'createEvent', component: CreateEventComponent },
      { path: 'campusList', component: CampusListSearchComponent},
      { path: 'dashboard', component: CompanyHomeDashboardComponent },
      { path: 'pageNotFound', component: NotFoundComponent },
      { path: '**', redirectTo: 'pageNotFound' },
    ]
  },
  { path: 'companysearch', component: CompanySearchComponent },

];

export const companyRouter: ModuleWithProviders = RouterModule.forRoot(router);
