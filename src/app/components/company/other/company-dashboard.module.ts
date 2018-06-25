
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { EffectivenessGraphComponent } from './dashboard/effectiveness-graph/effectiveness-graph.component';
import { JobroleGraphComponent } from './dashboard/jobrole-graph/jobrole-graph.component';
import { CompanyHiringComponent } from './dashboard/company-hiring/company-hiring.component';
import { ComDriveComponent } from './datatable/com-drive/com-drive.component';
import { ComUnfilledPositionComponent } from './datatable/com-unfilled-position/com-unfilled-position.component';
import { ComRecentPlacementsComponent } from './datatable/com-recent-placements/com-recent-placements.component';
import { ComUpcomingEventsComponent } from './datatable/com-upcoming-events/com-upcoming-events.component';
import { ComEventCalenderComponent } from './datatable/com-event-calender/com-event-calender.component';
import { CompanyDashboardSummaryComponent } from './dashboard/company-dashboard-summary/company-dashboard-summary.component';
import { CompanyHomeDashboardComponent } from './company-home-dashboard.component';
import { MaterialModule } from '../../../material/material.module';




@NgModule({
    declarations: [
        EffectivenessGraphComponent,
        JobroleGraphComponent,
        CompanyHiringComponent,
        ComDriveComponent,
        ComUnfilledPositionComponent,
        ComRecentPlacementsComponent,
        ComUpcomingEventsComponent,
        ComEventCalenderComponent,
        CompanyDashboardSummaryComponent,
        CompanyHomeDashboardComponent
       ],
    imports: [
        CommonModule,
        NgxChartsModule,
        NgxDatatableModule,
        MaterialModule
    ],
    exports: [
        NgxChartsModule,
        NgxDatatableModule,
        MaterialModule
    ]
})
export class CompanyDashboardModule {}
