import { Component, OnInit } from '@angular/core';

import { EntityAuditService } from './entity-audit.service';
import { EntityAuditEvent } from './entity-audit-event.model';
import * as diff2html from 'diff2html';

@Component({
  selector: 'jhi-entity-audit',
  templateUrl: './entity-audit.component.html',
  styles: []
})
export class EntityAuditComponent implements OnInit {
  audits: EntityAuditEvent[] = [];
  entities: string[] = [];
  selectedEntity: string;
  limits = [25, 50, 100, 200];
  selectedLimit = this.limits[0];
  loading = false;

  constructor(private service: EntityAuditService) { }

  ngOnInit() {
    this.service.getAllAudited().subscribe((entities) => {
      this.entities = entities;
    });
  }

  loadChanges() {
    this.loading = true;
    this.service.findByEntity(this.selectedEntity, this.selectedLimit)
      .subscribe((audits) => {
        this.audits = audits.map((it) => {
          it.entityValue = JSON.parse(it.entityValue)
          return it
        });
        this.loading = false;

      }, (err) => this.loading = false);
  }

  trackId(index: number, item: EntityAuditEvent) {
	   return item.id;
   }

  openChange(audit) {
    if (audit.commitVersion <= 2) {
      alert("There is no previous version available for this entry. \n This is the first audited captured for this object.");
    } else {
      this.service.getPrevVersion(audit.entityType, audit.entityId, audit.commitVersion).subscribe((data) => {
        alert(data.entityType);

        var previousVersion = JSON.parse(data.entityValue),
              currentVersion = audit.entityValue;

        alert(diff2html);

      });
    }
  }
}
