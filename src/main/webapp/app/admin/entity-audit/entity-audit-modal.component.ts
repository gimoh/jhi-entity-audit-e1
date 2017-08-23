import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EntityAuditService } from './entity-audit.service';
import { EntityAuditEvent } from './entity-audit-event.model';

@Component({
    selector: 'entity-audit-modal',
    templateUrl: './entity-audit-modal.component.html'
})
export class EntityAuditModalComponent {

    output: string;

    constructor(private healthService: EntityAuditService, public activeModal: NgbActiveModal) {}

    ngOnInit() {

    }

    openChange(audit: EntityAuditEvent) {
      this.output = JSON.stringify(audit.entityValue, null, 2);
    }

}
