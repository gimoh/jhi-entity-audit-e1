import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Task } from './task.model';
import { TaskPopupService } from './task-popup.service';
import { TaskService } from './task.service';
import { Job, JobService } from '../job';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-task-dialog',
    templateUrl: './task-dialog.component.html'
})
export class TaskDialogComponent implements OnInit {

    task: Task;
    isSaving: boolean;

    jobs: Job[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private taskService: TaskService,
        private jobService: JobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobService.query()
            .subscribe((res: ResponseWrapper) => { this.jobs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(
                this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<Task>) {
        result.subscribe((res: Task) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Task) {
        this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-task-popup',
    template: ''
})
export class TaskPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taskPopupService
                    .open(TaskDialogComponent as Component, params['id']);
            } else {
                this.taskPopupService
                    .open(TaskDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
