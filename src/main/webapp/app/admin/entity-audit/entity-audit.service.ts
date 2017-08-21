import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityAuditEvent } from './entity-audit-event.model';

@Injectable()
export class EntityAuditService {

  constructor() { }

  getAllAudited(): Observable<string[]> {
    return Observable.of(['Foo', 'Bar']);
  }

  findByEntity(entity: string, limit: number): Observable<EntityAuditEvent[]> {
    return Observable.of([
      {
        id: '1',
        entityId: '1011',
        entityType: 'Foo',
        action: 'CREATE',
        entityValue: '{}',
        commitVersion: 1,
        modifiedBy: 'admin',
        modifiedDate: new Date()
      },
    ]);
  }

}
