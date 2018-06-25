// import { CampusPlacementComponent } from './modules/campus/campus-placement/campus-placement.component';
import { CompanyProfileComponent } from './components/shared/my-profile/company-profile/company-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {CdkTableModule} from '@angular/cdk';
import { CdkTableModule } from '@angular/cdk/table';
import { ContactComponent } from './components/shared/contact/contact.component';
import { AppComponent } from './app.component';
import { JobRoleComponent } from './components/company/ControlData/job-role/jobrole.component';
// import { InstituteProfileComponent } from './components/campus/forms/institute-profile/institute-profile.component';
import { FormComponent } from './components/student/form/form.component';
import { AddressComponent } from './components/shared/address/address.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/Common/header/header.component';
import { FooterComponent } from './components/Common/footer/footer.component';
import { CampusComponent } from './modules/campus/campus.component';
import { CompanyComponent } from './modules/company/company.component';
import { StudentComponent } from './modules/student/student.component';
import { MasterDataComponent } from './modules/company/master-data/master-data.component';
import { ControlDataComponent } from './modules/company/control-data/control-data.component';
import { RecruitmentComponent } from './modules/company/recruitment/recruitment.component';
import { ScoraXchangeHomeComponent } from './modules/scora-xchange-home/scora-xchange-home.component';
// Landing Pages starts
import { CampusLandingPageComponent } from './components/Common/landing-pages/campus-landing-page/campus-landing-page.component';
import { CompanyLandingPageComponent } from './components/Common/landing-pages/company-landing-page/company-landing-page.component';
import { StudentLandingPageComponent } from './components/Common/landing-pages/student-landing-page/student-landing-page.component';
import { ScoraxchangeHomePageComponent } from './components/Common/landing-pages/scoraxchange-landing-page/scoraxchange-landing-page.component';
// Landing pages ends

// company and campus dashboards ends
// Router starts
import { campusRouter } from './app.campus-routes';
import { companyRouter } from './app.company-routes';
import { studentRouter } from './app.student-routes';
import { scoraHomeRouter } from './app.home-routes';
import { scoraAdminRoute } from './app.scoraXchange-admin-routes';

// Router Ends
import { MasterComponent } from './modules/campus/master/master.component';
import { JobDatafilterPipe } from './components/company/Pipes/job-role/job-datafilter.pipe';
import { InstituteComponent } from './components/campus/MasterData/institute/institute.component';
import { DepartmentComponent } from './components/campus/MasterData/department/department.component';
import { ProgrammeComponent } from './components/campus/MasterData/programme/programme.component';
import { DegreeComponent } from './components/student/form/degree/degree.component';
import { AcademicsComponent } from './components/student/form/academics/academics.component';
// TODO : Please segregate the import statements on the basis of modules via Student, Campus, Company
import { CompaniesComponent } from './components/company/MasterData/companies/companies.component';
import { CookieService } from 'angular2-cookie/core';
// import { CookieService } from 'ngx-cookie-service';
import { OrganizationComponent } from './components/company/MasterData/organization/organization.component';
import { OrgDataFilterPipe } from './components/company/Pipes/organization/org-data-filter.pipe';
import { DataTableModule } from 'angular2-datatable';
import { CompensationPackageComponent } from './components/company/ControlData/compensation-package/compensation-package.component';
import { CompensationTablePipe } from './components/company/Pipes/compensation-packages/compensation-table.pipe';
import { DepartmentPipe } from './components/campus/Pipes/department/department.pipe';
import { ProgramPipePipe } from './components/campus/Pipes/programme/program-pipe.pipe';
import { ProjectComponent } from './components/student/form/project/project.component';
import { AcademicsSidebarComponent } from './components/student/form/academics-sidebar/academics-sidebar.component';
import { AllPlacementComponent } from './components/campus/other/dashboard/all-placement/all-placement.component';
import { UnattendedStudentComponent } from './components/campus/other/dashboard/unattended-student/unattended-student.component';
import { ShortlistedStudentComponent } from './components/campus/other/dashboard/shortlisted-student/shortlisted-student.component';
import { StudentCompaniesComponent } from './components/campus/other/dashboard/student-companies/student-companies.component';
import { AllStudentComponent } from './components/campus/other/dashboard/all-student/all-student.component';
import { DriveComponent } from './components/company/drive/drive.component';
import { SharedDriveService } from './components/company/drive/shared-drive.service';
import { DriveListViewComponent } from './components/company/drive/drive-list-view/drive-list-view.component';
import { CampusListSearchComponent } from './components/shared/widgets/campus-list-search/campus-list-search.component';
import { CampusListSearchPipe } from './components/shared/Pipes/campusList/campus-list-search.pipe';
import { CreateDriveComponent } from './components/company/drive/create-drive/create-drive.component';
import { AccordionModule } from 'ngx-accordion';
import { GetCampusListViewComponent } from './components/company/drive/get-campus-list-view/get-campus-list-view.component';
import { EventComponent } from './components/company/event/event.component';
import { CampusProfileComponent } from './components/shared/my-profile/campus-profile/campus-profile.component';

// Import Campus Module
import { CampusModule } from './../moduleDeclarations/campus.module';
import { CampusService } from './services/common/landing-pages/campus-landing/campus.service';

import {CampusHomeComponent} from './components/campus/other/dashboard/campus-home.component';
import { RecentPlacementsComponent } from './components/campus/other/dashboard/datatables/recent-placements/recent-placements.component';
import { CompanyDashboardProfileComponent } from './components/company/other/company-dashboard-profile/company-dashboard-profile.component';
import { DrivesComponent } from './components/campus/other/dashboard/datatables/drives/drives.component';
import { AvgSalaryComponent } from './components/campus/other/dashboard/datatables/avg-salary/avg-salary.component';
import { DashboardSummaryComponent } from './components/campus/other/dashboard/dashboard-summary/dashboard-summary.component';
import { UpcomingEventsComponent } from './components/campus/other/dashboard/datatables/upcoming-events/upcoming-events.component';
import { CampusHiringComponent } from './components/campus/other/dashboard/campus-hiring/campus-hiring.component';
import { CompanyDashboardModule } from './components/company/other/company-dashboard.module';
import { EventListService } from './services/company/event/eventList/event-list.service';

// These componnets belong to Company + Capmus Profile

import { HeaderBannerComponent } from './components/Common/profile/header-banner/header-banner.component';
import { AboutCompanyComponent } from './components/Common/profile/about/about.component';
import { DescriptionComponent } from './components/Common/profile/description/description.component';
import { FooterBannerComponent } from './components/Common/profile/footer-banner/footer-banner.component';
import { ContactButtonComponent } from './components/Common/profile/contact-button/contact-button.component';
import { AboutCompanyService } from './services/company/profile/about-company.service';
import { ProfileComponent } from './components/student/form/profile/profile.component';
import { CompanyDispalyProfileComponent } from './components/Common/profile/company-dispaly-profile.component';
import { CampusDataUploadComponent } from './components/campus/campus-data-upload/campus-data-upload.component';
import { CampusDispalyProfileComponent } from './components/Common/profile/campus-display-profile.component';


// import { UploadFileComponent } from './components/shared/upload/upload-file/upload-file.component';
// import { UploadDataTableComponent } from './components/shared/upload/upload-data-table/upload-data-table.component';
// import { UploadDataAnalysisComponent } from './components/shared/upload/upload-data-analysis/upload-data-analysis.component';
import { CompanyDataUploadComponent } from './components/company/company-data-upload/company-data-upload.component';
import { CheckedCampusListComponent } from './components/company/event/checked-campus-list/checked-campus-list.component';
import { EventListComponent } from './components/company/event/event-list/event-list.component';
import { EventListPipe } from './components/company/Pipes/event/eventList/event-list.pipe';
import { CreateEventComponent } from './components/company/event/create-event/create-event.component';

// import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { DrivePipe } from './components/company/Pipes/drive/drive.pipe';
import { GetCollegeListPipe } from './components/company/Pipes/get-college-list/get-college-list.pipe';
import { ScoraXchangeAdminComponent } from './modules/scora-xchange-admin/scora-xchange-admin.component';
import { ScoraEnrollCampusComponent } from './components/scora-admin/scora-enroll-campus/scora-enroll-campus.component';
import { CompanySearchComponent } from './components/shared/widgets/company-search/company-search.component';
import { CompanySearchPipe } from './components/shared/Pipes/company-search/company-search.pipe';

import { EventStudentListComponent, OfferDropDownComponent } from './components/shared/widgets/event-student-list/event-student-list.component';
import { CampusEventComponent } from './components/campus/campus-event/campus-event.component';
import { CheckedCampusListPipe } from './components/company/Pipes/event/checkedCampusList/checked-campus-list.pipe';
import { CampusListComponent } from './components/company/ControlData/campus-list/campus-list.component';
import { CreateCampusListComponent } from './components/company/ControlData/campus-list/create-campus-list/create-campus-list.component';
import { CampusListListComponent } from './components/company/ControlData/campus-list/campus-list-list/campus-list-list.component';
import { EventStudentManagementComponent } from './components/shared/widgets/event-student-management/event-student-management.component';
import { CampusDriveComponent } from './components/campus/campus-drive/campus-drive.component';
import { CampusDriveListViewComponent } from './components/campus/campus-drive/campus-drive-list-view/campus-drive-list-view.component';
import { CreateCampusDriveComponent } from './components/campus/campus-drive/create-campus-drive/create-campus-drive.component';
import { CampusDrivePipe } from './components/campus/Pipes/campusDrive/campus-drive.pipe';
import { EventStudentListPipe } from './components/company/Pipes/event-student-list/event-student-list.pipe';
import { CreateCampusEventComponent } from './components/campus/campus-event/create-campus-event/create-campus-event.component';
import { SelectedCampusListComponent } from './components/company/ControlData/campus-list/selected-campus-list/selected-campus-list.component';
import { SelectedCampusListPipe } from './components/company/Pipes/campusList/SelectedCampusList/selected-campus-list.pipe';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';
import { EmployerDriveService } from './services/company/employerDrive/employer-drive.service';
import { CampusDriveService } from './services/campus/campus-drive/campus-drive.service';

import { CampusSearchListViewComponent } from './components/campus/campus-event/campus-search-list-view/campus-search-list-view.component';

// Toaster
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { CampusEventListComponent } from './components/campus/campus-event/campus-event-list/campus-event-list.component';
import { CampusEventListPipe } from './components/campus/Pipes/campusEvent/campus-event-list.pipe';
import { CampusEventStudentListPipe } from './components/campus/Pipes/campusEvent/eventStudentList/campus-event-student-list.pipe';
import { CampusStudentListComponent, CampusOfferDropDownComponent,DeleteDialogComponent } from './components/campus/campus-event/campus-student-list/campus-student-list.component';
import { ScoratechLandingPageComponent } from './components/Common/landing-pages/scoratech-landing-page/scoratech-landing-page.component';
import { SignInComponent } from './components/Common/sign in/sign-in/sign-in.component';
// import { AngularMultiSelectModule } from './utils/angular2-multiselect-dropdown';
import { OrderByDatePipe } from './components/shared/Pipes/order-by-date/order-by-date.pipe';

// Student Profile
import { StudentProfileService } from './services/students/student-profile.service';
import { StudentProfileComponent } from './components/Common/student-profile/student-profile.component';
import { StudentGraphComponent } from './components/student/dashboard/student-graph/student-graph.component';

// Student Dashboard
import { DisplayStudentComponent } from './components/student/dashboard/student-dashboard.component';
import { CampusPlacementComponent } from './modules/campus/campus-placement/campus-placement.component';
import { ActionsCreateCampusEventComponent } from './components/campus/campus-event/actions-create-campus-event/actions-create-campus-event.component';

import { LimitToPipe } from './components/campus/Pipes/limit-to.pipe';
// import { DateTimePickerModule} from 'ngx-datetime-picker';

// Search Service
import { CompanySearchService } from './services/shared/widgets/company-search/company-search.service';
import { CampusListSearchService } from './services/shared/widgets/campus-list-search.service';
import { LookupvalueService } from './services/shared/lookupvalue.service';
import { NotificationDetailComponent } from './components/shared/notifications/notification-detail/notification-detail.component';
import { EventStudentListService } from './services/shared/widgets/studentList/event-student-list.service';
import { CampusEventStudentListService } from './services/shared/widgets/eventStudentList/campus-event-student-list.service';
import { CampusUploadFileComponent } from './components/shared/upload/campus-upload-file/campus-upload-file.component';
import { CompanyUploadFileComponent } from './components/shared/upload/company-upload-file/company-upload-file.component';
import { CompanyUploadPipe } from './components/company/Pipes/upload/company-upload.pipe';
import { NotificationsPipe } from './components/shared/Pipes/notifications/notifications.pipe';
import { LookUpGetAndSetLocalSrorage } from './lookup.service';
import { LabelsCookiesService } from './services/shared/common-cookies/labels-cookies.service';
import { StudentManagementComponent } from './components/shared/widgets/student-management/student-management.component';
import { StudentSearchResultComponent, RemoveStudentsDialogComponent } from './components/shared/widgets/student-management/student-search-result/student-search-result.component';
import { EmptyResponseService } from './services/shared/empty-response/empty-response.service';
import { StudentManagementService } from './components/shared/widgets/student-management/student-management.service';
import { CampusSearchFilterPipe } from './components/shared/Pipes/campus-search/campus-search-filter.pipe';
import { BarGraphComponent } from './services/shared/bar-graph/bar-graph.component';
import { PieChartComponent } from './services/shared/pie-chart/pie-chart.component';
import { NoResponseComponent } from './components/shared/widgets/no-response.component';
import { CompanyDashboardService } from './components/company/other/company-dashboard.service';
import { CampusDashboardService } from './components/campus/other/dashboard/campus-dashboard.service';
import { CompanyDashboardSampleDataService } from './components/company/other/sample-data.service';
import { NullIntPipe } from './components/shared/Pipes/null-int.pipe';
import { ValidateGraphService } from './services/shared/graph-validation/validat-graph.service';
import { EventService } from './services/company/event/event.service';
import { CampusEventService } from './services/campus/event/campus-event.service';
import { DepartmentService } from './services/campus/MasterData/department/department.service';
import { UiAttachmentsService } from './services/shared/ui-attachments/ui-attachments.service';
import { ProgramService } from './services/campus/MasterData/programme/program.service';
import { CompanyLoginService } from './services/common/landing-pages/company-landing/company-login.service';
import { CampusNotificationsService } from './services/shared/notifications/campus-notifications/campus-notifications.service';
import { ScoraLandingService } from './services/common/landing-pages/scora-landing/scora-landing.service';
import { CampusListService } from './services/company/ControlData/campusList/campus-list.service';
import { CompensationPackageService } from './services/company/ControlData/compensation-package/compensation-package.service';
import { CheckedCampusListService } from './services/company/event/checkedCampusList/checked-campus-list.service';
import { CompanyService } from './services/company/MasterData/company/company.service';
import { OrganizationService } from './services/company/MasterData/organization/organization.service';
import { ScoraEnrollService } from './services/scora-admin/enroll/scora-enroll.service';
import { CompanyProfileService } from './components/shared/my-profile/company-profile/company-profile.service';
import { CampusProfileServiceService } from './components/shared/my-profile/campus-profile/campus-profile-service.service';
import {CampusUploadService} from './services/shared/upload/campus-upload/campus-upload.service';
import {CampusUploadDocService} from './components/campus/campus-data-upload/campus-upload-doc.service';
import { AboutCampusService } from './services/campus/profile/about-campus.service';
import {CompanyUploadDocService} from './components/company/company-data-upload/company-upload-doc.service';
import { JobRoleService } from './services/company/ControlData/job-role/job-role.service';
import { AcademicsService } from './services/students/form/academics.service';
import { PostalService } from './services/shared/postal.service';
import { ProfileFormService } from './services/students/profile-form.service';
import {CompanyUploadService} from './services/shared/upload/company-upload/company-upload.service';
import {InstituteService} from './services/campus/MasterData/institute/institute.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './auth/authorization.interceptor';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ToastrModule } from 'ngx-toastr';
import { RequestForDemoComponent } from './components/Common/request-for-demo/request-for-demo.component';
import { MatDialogConfig } from '@angular/material';
import { NotFoundComponent } from './components/Common/not-found/not-found.component';
import { PageNotFoundComponent } from './components/Common/not-found/page-not-found/page-not-found.component';

import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { TermsOfUseComponent } from './components/Common/landing-pages/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './components/Common/landing-pages/privacy-policy/privacy-policy.component';
import { Component} from '@angular/core';
import { ScrollToModule } from 'ng2-scroll-to-el';
@NgModule({
  declarations: [
    RemoveStudentsDialogComponent,
    AppComponent,
    ContactComponent,
    AddressComponent,
    JobRoleComponent,
    FormComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CampusComponent,
    CompanyComponent,
    StudentComponent,
    MasterDataComponent,
    ControlDataComponent,
    RecruitmentComponent,
    CampusLandingPageComponent,
    CompanyLandingPageComponent,
    StudentLandingPageComponent,
    ScoraxchangeHomePageComponent,
    ScoraXchangeHomeComponent,
    MasterComponent,
    JobDatafilterPipe,
    MasterComponent,
    JobDatafilterPipe,
    InstituteComponent,
    DepartmentComponent,
    ProgrammeComponent,
    DepartmentPipe,
    ProgramPipePipe,
    CompaniesComponent,
    OrganizationComponent,
    OrgDataFilterPipe,
    CompensationPackageComponent,
    CompensationTablePipe,
    ProjectComponent,
    DegreeComponent,
    AcademicsComponent,
    AcademicsSidebarComponent,
    AllPlacementComponent,
    UnattendedStudentComponent,
    ShortlistedStudentComponent,
    StudentCompaniesComponent,
    AllStudentComponent,
    DriveComponent,
    CreateDriveComponent,
    GetCampusListViewComponent,
    DriveListViewComponent,
    CampusListSearchComponent,
    CampusListSearchPipe,
    EventComponent,
    CampusProfileComponent,
    CampusHomeComponent,
    RecentPlacementsComponent,
    CompanyDashboardProfileComponent,
    DrivesComponent,
    AvgSalaryComponent,
    UpcomingEventsComponent,
    DashboardSummaryComponent,
    CampusHiringComponent,
    HeaderBannerComponent,
    AboutCompanyComponent,
    DescriptionComponent,
    FooterBannerComponent,
    ContactButtonComponent,
    ProfileComponent,
    CompanyDispalyProfileComponent,
    CampusDataUploadComponent,
    CompanyProfileComponent,
    EventStudentListComponent,
    CompanySearchComponent,
    CompanySearchPipe,
    CompanyDataUploadComponent,
    CheckedCampusListComponent,
    EventListComponent,
    EventListPipe,
    CreateEventComponent,
    CampusEventComponent,
    CampusDispalyProfileComponent,
    DrivePipe,
    GetCollegeListPipe,
    ScoraXchangeAdminComponent,
    ScoraEnrollCampusComponent,
    CheckedCampusListPipe,
    EventStudentManagementComponent,
    CampusListComponent,
    CreateCampusListComponent,
    CampusListListComponent,
    CampusDriveComponent,
    CampusDriveListViewComponent,
    CreateCampusDriveComponent,
    CampusDrivePipe,
    EventStudentListPipe,
    CreateCampusEventComponent,
    SelectedCampusListComponent,
    SelectedCampusListPipe,
    NotificationsComponent,
    CampusSearchListViewComponent,
    CampusDispalyProfileComponent,
    CampusEventListComponent,
    CampusEventListPipe,
    CampusEventStudentListPipe,
    CampusStudentListComponent,
    ScoratechLandingPageComponent,
    SignInComponent,
    OrderByDatePipe,
    StudentGraphComponent,
    DisplayStudentComponent,
    StudentProfileComponent,
    CampusPlacementComponent,
    ActionsCreateCampusEventComponent,
    LimitToPipe,
    NotificationDetailComponent,
    CampusUploadFileComponent,
    CompanyUploadFileComponent,
    CompanyUploadPipe,
    NotificationsPipe,
    OfferDropDownComponent,
    CampusOfferDropDownComponent,
    StudentManagementComponent,
    StudentSearchResultComponent,
    CampusSearchFilterPipe,
    BarGraphComponent,
    PieChartComponent,
    NoResponseComponent,
    DeleteDialogComponent,
    NullIntPipe,
    RequestForDemoComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    NotFoundComponent,
    PageNotFoundComponent
    // DateTimePickerModule
  ],
  entryComponents: [OfferDropDownComponent, CampusOfferDropDownComponent , DeleteDialogComponent, RemoveStudentsDialogComponent],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AmazingTimePickerModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    CdkTableModule,
    ReactiveFormsModule,
    campusRouter,
    companyRouter,
    studentRouter,
    scoraHomeRouter,
    scoraAdminRoute,
    DataTableModule,
    AccordionModule,
    ChartsModule,
    CampusModule,
    ToastModule.forRoot(),
    CompanyDashboardModule,
    NgxCarouselModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    { provide: CookieService, useFactory: cookieServiceFactory },
    CampusService,
    MatDialogConfig,
    AboutCompanyService,
    EmployerDriveService,
    CampusDriveService,
    CompanyDashboardService,
    StudentProfileService,
    SharedDriveService,
    CompanySearchService,
    CampusListSearchService,
    LookupvalueService,
    EventListService,
    EventStudentListService,
    DriveComponent, DriveListViewComponent,
    EventListComponent,
    CampusDriveListViewComponent,
    LookUpGetAndSetLocalSrorage,
    LabelsCookiesService,
    EmptyResponseService,
    StudentManagementService,
    CampusDashboardService,
    CompanyDashboardSampleDataService,
    NullIntPipe,
    ValidateGraphService,
    EventService,
    CampusEventService,
    DepartmentService,
    UiAttachmentsService,
    ProgramService,
    CompanyLoginService,
    CampusNotificationsService,
    ScoraLandingService,
    CampusListService,
    CompensationPackageService,
    CheckedCampusListService,
    CompanyService,
    OrganizationService,
    ScoraEnrollService,
    CompanyProfileService,
    CampusProfileServiceService,
    CampusUploadService,
    CampusUploadDocService,
    AboutCampusService,
    CompanyUploadDocService,
    JobRoleService,
    AcademicsService,
    ProfileFormService,
    PostalService,
    CompanyUploadService,
    InstituteService,
    CampusEventStudentListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function cookieServiceFactory() {
  return new CookieService();
}
