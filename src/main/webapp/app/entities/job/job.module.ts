import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    JobService,
    JobPopupService,
    JobComponent,
    JobDetailComponent,
    JobDialogComponent,
    JobPopupComponent,
    JobDeletePopupComponent,
    JobDeleteDialogComponent,
    jobRoute,
    jobPopupRoute,
    JobResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...jobRoute,
    ...jobPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        JobComponent,
        JobDetailComponent,
        JobDialogComponent,
        JobDeleteDialogComponent,
        JobPopupComponent,
        JobDeletePopupComponent,
    ],
    entryComponents: [
        JobComponent,
        JobDialogComponent,
        JobPopupComponent,
        JobDeleteDialogComponent,
        JobDeletePopupComponent,
    ],
    providers: [
        JobService,
        JobPopupService,
        JobResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterJobModule {}
