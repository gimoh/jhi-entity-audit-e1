import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityAuditEvent } from './entity-audit-event.model';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class EntityAuditService {

  constructor(private http: Http) { }

  getAllAudited(): Observable<string[]> {
    return this.http.get('api/audits/entity/all').map((response) => response.json());
  }

  findByEntity(entity: string, limit: number): Observable<EntityAuditEvent[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('entityType', entity);
    params.set('limit', limit.toString());

    return this.http.get('api/audits/entity/changes', { search: params }).map((response) => response.json());
  }

  getPrevVersion(qualifiedName: string, entityId: string, commitVersion: number) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('qualifiedName', qualifiedName);
    params.set('entityId', entityId);
    params.set('commitVersion', commitVersion.toString());

    return this.http.get('api/audits/entity/changes/version/previous', {search: params}).map((response) => response.json());
  }

}
