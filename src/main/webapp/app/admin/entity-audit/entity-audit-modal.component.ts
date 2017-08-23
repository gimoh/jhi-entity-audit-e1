import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EntityAuditService } from './entity-audit.service';

@Component({
    selector: 'entity-audit-modal',
    templateUrl: './entity-audit-modal.component.html'
})
export class EntityAuditModalComponent {

    currentHealth: any;

    constructor(private healthService: EntityAuditService, public activeModal: NgbActiveModal) {}

    // baseName(name) {
    //     return this.healthService.getBaseName(name);
    // }
    //
    // subSystemName(name) {
    //     return this.healthService.getSubSystemName(name);
    // }

    readableValue(value: number) {
        if (this.currentHealth.name !== 'diskSpace') {
            return value.toString();
        }

        // Should display storage space in an human readable unit
        const val = value / 1073741824;
        if (val > 1) { // Value
            return val.toFixed(2) + ' GB';
        } else {
            return (value / 1048576).toFixed(2) + ' MB';
        }
    }
}
