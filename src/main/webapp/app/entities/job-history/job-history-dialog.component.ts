import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobHistory } from './job-history.model';
import { JobHistoryPopupService } from './job-history-popup.service';
import { JobHistoryService } from './job-history.service';
import { Job, JobService } from '../job';
import { Department, DepartmentService } from '../department';
import { Employee, EmployeeService } from '../employee';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-job-history-dialog',
    templateUrl: './job-history-dialog.component.html'
})
export class JobHistoryDialogComponent implements OnInit {

    jobHistory: JobHistory;
    isSaving: boolean;

    jobs: Job[];

    departments: Department[];

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private jobHistoryService: JobHistoryService,
        private jobService: JobService,
        private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobService
            .query({filter: 'jobhistory-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.jobHistory.jobId) {
                    this.jobs = res.json;
                } else {
                    this.jobService
                        .find(this.jobHistory.jobId)
                        .subscribe((subRes: Job) => {
                            this.jobs = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.departmentService
            .query({filter: 'jobhistory-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.jobHistory.departmentId) {
                    this.departments = res.json;
                } else {
                    this.departmentService
                        .find(this.jobHistory.departmentId)
                        .subscribe((subRes: Department) => {
                            this.departments = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.employeeService
            .query({filter: 'jobhistory-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.jobHistory.employeeId) {
                    this.employees = res.json;
                } else {
                    this.employeeService
                        .find(this.jobHistory.employeeId)
                        .subscribe((subRes: Employee) => {
                            this.employees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(
                this.jobHistoryService.create(this.jobHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<JobHistory>) {
        result.subscribe((res: JobHistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: JobHistory) {
        this.eventManager.broadcast({ name: 'jobHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackJobById(index: number, item: Job) {
        return item.id;
    }

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-job-history-popup',
    template: ''
})
export class JobHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobHistoryPopupService: JobHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobHistoryPopupService
                    .open(JobHistoryDialogComponent as Component, params['id']);
            } else {
                this.jobHistoryPopupService
                    .open(JobHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
