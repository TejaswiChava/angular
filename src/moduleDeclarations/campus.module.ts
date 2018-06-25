import { NgModule } from '@angular/core';
import { DashboardModule } from './../app/components/campus/other/dashboard/dashboard.module';


@NgModule ({
    imports: [DashboardModule],
    exports: [DashboardModule]
})

export class CampusModule {}
