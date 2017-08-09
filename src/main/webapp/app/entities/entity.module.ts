import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterRegionModule } from './region/region.module';
import { JhipsterCountryModule } from './country/country.module';
import { JhipsterLocationModule } from './location/location.module';
import { JhipsterDepartmentModule } from './department/department.module';
import { JhipsterTaskModule } from './task/task.module';
import { JhipsterEmployeeModule } from './employee/employee.module';
import { JhipsterJobModule } from './job/job.module';
import { JhipsterJobHistoryModule } from './job-history/job-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterRegionModule,
        JhipsterCountryModule,
        JhipsterLocationModule,
        JhipsterDepartmentModule,
        JhipsterTaskModule,
        JhipsterEmployeeModule,
        JhipsterJobModule,
        JhipsterJobHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
