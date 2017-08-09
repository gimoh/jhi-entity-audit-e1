import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { JobHistoryComponent } from './job-history.component';
import { JobHistoryDetailComponent } from './job-history-detail.component';
import { JobHistoryPopupComponent } from './job-history-dialog.component';
import { JobHistoryDeletePopupComponent } from './job-history-delete-dialog.component';

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history',
        component: JobHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'job-history/:id',
        component: JobHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history-new',
        component: JobHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history/:id/edit',
        component: JobHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history/:id/delete',
        component: JobHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
