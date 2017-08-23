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
    left: string;
    right: string;

    constructor(private service: EntityAuditService,
                public activeModal: NgbActiveModal) {}

    ngOnInit() {

    }

    openChange(audit: EntityAuditEvent) {
      this.service.getPrevVersion(audit.entityType, audit.entityId, audit.commitVersion).subscribe((data) => {

        var previousVersion = JSON.stringify(JSON.parse(data.entityValue), null, 2),
              currentVersion = JSON.stringify(audit.entityValue, null, 2);
        this.left = previousVersion;
        this.right = currentVersion;
      });
    }

}