import { Component, OnInit } from '@angular/core';

import { EntityAuditService } from './entity-audit.service';
import { EntityAuditEvent } from './entity-audit-event.model';

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

}
