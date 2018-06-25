import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';

import { FormComponent } from './components/student/form/form.component';
import { ProfileComponent } from './components/student/form/profile/profile.component';
import { DegreeComponent } from './components/student/form/degree/degree.component';
import { AcademicsComponent } from './components/student/form/academics/academics.component';
import { AcademicsSidebarComponent } from './components/student/form/academics-sidebar/academics-sidebar.component';
import { StudentLandingPageComponent } from './components/Common/landing-pages/student-landing-page/student-landing-page.component';
import { StudentProfileComponent } from './components/Common/student-profile/student-profile.component';
import { StudentManagementComponent } from './components/shared/widgets/student-management/student-management.component';


export const studentRoutes: Routes = [
    { path: 'studentLandingPage', component: StudentLandingPageComponent},
    { path: 'student/profile', component: FormComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'studentform', component: FormComponent},
    { path: 'studentdegree', component: DegreeComponent},
    { path: 'academicsSidebar', component: AcademicsSidebarComponent},
    { path: 'studentacademics', component: AcademicsComponent},
    { path: 'studentProfile', component: StudentProfileComponent},
    { path: 'studentSearch', component: StudentManagementComponent}
];

export const studentRouter: ModuleWithProviders = RouterModule.forChild(studentRoutes);
