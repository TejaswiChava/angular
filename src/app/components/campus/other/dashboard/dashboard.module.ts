import { NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CommonModule } from '@angular/common';






@NgModule({
    declarations: [
       ],
    imports: [
        CommonModule,
        NgxChartsModule,
        NgxDatatableModule,
    ],
    exports: [
        NgxChartsModule,
        NgxDatatableModule
    ]
})
export class DashboardModule {}
