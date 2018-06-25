import { DriveComponent } from './components/company/drive/drive.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampusService } from './services/common/landing-pages/campus-landing/campus.service';

import { AppComponent } from './app.component';
import { CampusComponent } from './modules/campus/campus.component';
import { MasterComponent } from './modules/campus/master/master.component';
import { InstituteComponent } from './components/campus/MasterData/institute/institute.component';
import { DepartmentComponent } from './components/campus/MasterData/department/department.component';
import { ProgrammeComponent } from './components/campus/MasterData/programme/programme.component';
import { CampusListSearchComponent } from './components/shared/widgets/campus-list-search/campus-list-search.component';
import { CampusProfileComponent } from './components/shared/my-profile/campus-profile/campus-profile.component';
import { CampusDataUploadComponent } from './components/campus/campus-data-upload/campus-data-upload.component';
import { CampusEventComponent } from './components/campus/campus-event/campus-event.component';
import { CreateCampusDriveComponent } from './components/campus/campus-drive/create-campus-drive/create-campus-drive.component';
import { CampusDriveComponent } from './components/campus/campus-drive/campus-drive.component';
import { CreateCampusEventComponent } from './components/campus/campus-event/create-campus-event/create-campus-event.component';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';

// Dashboard
import { AllPlacementComponent } from './components/campus/other/dashboard/all-placement/all-placement.component';
import { RecentPlacementsComponent } from './components/campus/other/dashboard/datatables/recent-placements/recent-placements.component';
import { UnattendedStudentComponent } from './components/campus/other/dashboard/unattended-student/unattended-student.component';
import { ShortlistedStudentComponent } from './components/campus/other/dashboard/shortlisted-student/shortlisted-student.component';
import { CampusHomeComponent } from './components/campus/other/dashboard/campus-home.component';
import { DrivesComponent } from './components/campus/other/dashboard/datatables/drives/drives.component';
import { CampusHiringComponent } from './components/campus/other/dashboard/campus-hiring/campus-hiring.component';

// Profile
import { CampusDispalyProfileComponent } from './components/Common/profile/campus-display-profile.component';
// placement
import { CampusPlacementComponent } from './modules/campus/campus-placement/campus-placement.component';
import { ActionsCreateCampusEventComponent } from './components/campus/campus-event/actions-create-campus-event/actions-create-campus-event.component';
import { StudentManagementComponent } from './components/shared/widgets/student-management/student-management.component';
import { CompanySearchComponent } from './components/shared/widgets/company-search/company-search.component';
import {NotFoundComponent} from './components/Common/not-found/not-found.component';
export const campusRoutes: Routes = [
  // { path: 'address', component: AddressComponent},
  { path: 'campusList', component: CampusListSearchComponent },
  {
    path: 'campus', component: CampusComponent, canActivate: [CampusService],
    // { path: 'campus', component: CampusComponent,
    children: [
      {
        path: 'campusMaster', component: MasterComponent,
        children: [
          { path: 'institutes', component: InstituteComponent },
          { path: 'department', component: DepartmentComponent },
          { path: 'programme', component: ProgrammeComponent },
        ]
      },
      {
        path: 'placement', component: CampusPlacementComponent,
        children: [
          { path: 'campusEvent', component: CampusEventComponent },
          { path: 'campusDrive', component: CampusDriveComponent },
        ]
      },
      { path: 'dataUpload', component: CampusDataUploadComponent },
      { path: 'createEvent', component: CreateCampusEventComponent },
      { path: 'companysearch', component: CompanySearchComponent },
      { path: 'acceptCreateEvent/:id', component: ActionsCreateCampusEventComponent },
      { path: 'createDrive', component: CreateCampusDriveComponent },
      { path: 'myProfile', component: CampusProfileComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'dashboard', component: CampusHomeComponent },
      { path: 'StudentManagement', component: StudentManagementComponent },
      { path: 'pageNotFound', component: NotFoundComponent },
      { path: '**', redirectTo: 'pageNotFound' },

    ]
  },

  { path: 'campusProfile', component: CampusDispalyProfileComponent },


  // Dashboard Components
  { path: 'allStudent', component: AllPlacementComponent },
  { path: 'recent-placements', component: RecentPlacementsComponent },
  { path: 'unattended-students', component: UnattendedStudentComponent },
  { path: 'shortlisted-students', component: ShortlistedStudentComponent },
  { path: 'drivechart', component: DrivesComponent },
  { path: 'piechart', component: CampusHiringComponent }

];
export const campusRouter: ModuleWithProviders = RouterModule.forRoot(campusRoutes);
