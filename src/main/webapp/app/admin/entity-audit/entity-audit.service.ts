import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityAuditEvent } from './entity-audit-event.model';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class EntityAuditService {

  constructor(private http: Http) {

  }

  getAllAudited(): Observable<string[]> {
    return this.http.get('api/audits/entity/all').map((response) => response.json())
    // return Observable.of(['Foo', 'Bar']);
  }

  findByEntity(entity: string, limit: number): Observable<EntityAuditEvent[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('entityType', entity);
    params.set('limit', limit.toString());
    return this.http.get('api/audits/entity/changes', { search: params }).map((response) => response.json())


    // return Observable.of([
    //   {
    //     id: '1',
    //     entityId: '1011',
    //     entityType: 'Foo',
    //     action: 'CREATE',
    //     entityValue: '{}',
    //     commitVersion: 1,
    //     modifiedBy: 'admin',
    //     modifiedDate: new Date()
    //   },
    // ]);
  }

}
