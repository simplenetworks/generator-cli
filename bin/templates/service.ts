export default `
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListResultDTO } from 'src/app/helpers/listResult.interface';
import { formatDateForBackend } from 'src/app/helpers/time.utils';
import { environment } from 'src/environments/environment';

import { $Replace$DTO, $Replace$Filters } from '../../models/$replace$.model';

@Injectable({
  providedIn: "root"
})
export class Laravel$Replace$Service {
  constructor(private httpClient: HttpClient) { }

  private get ROUTES() {
    return {
      list: environment.baseUrl + "/api/$replace$s",
      show: environment.baseUrl + "/api/$replace$",
      store: environment.baseUrl + "/api/$replace$",
      destroy: environment.baseUrl + "/api/$replace$",
    };
  }

  public list(page: number,
    per_page: number,
    order: string,
    direction: string,
    filters: $Replace$Filters,
    includes?: string[]
  ): Observable<ListResultDTO<$Replace$DTO>> {
    let params = {};
    if (order) params["order"] = "" + order;
    if (direction) params["direction"] = "" + direction;
    if (includes) params["includes[]"] = includes;
    if (filters) {
      if (filters.start) params["start"] = formatDateForBackend(filters.start);
      if (filters.end) params["end"] = formatDateForBackend(filters.end);
      if (filters.client_id) params["client_id"] = filters.client_id;
      if (filters.project_id) params["project_id"] = filters.project_id;
      if (filters.filter) params["filter"] = filters.filter;
    }
    if (per_page) {
      params["per_page"] = "" + per_page;
      if (page) params["page"] = "" + page;
      return this.httpClient.get<ListResultDTO<$Replace$DTO>>(this.ROUTES.list, {
        params: new HttpParams({ fromObject: params })
      });
    } else {
      return this.httpClient.get<$Replace$DTO[]>(this.ROUTES.list, {
        params: new HttpParams({ fromObject: params })
      }).pipe(
        map(results => {
          return {
            data: results,
            total: results.length
          };
        })
      );
    }
  }

  public show(id: number): Observable<$Replace$DTO> {
    let params = { id: "" + id };
    return this.httpClient.get<$Replace$DTO>(this.ROUTES.show, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  public upsert($replace$: $Replace$DTO): Observable<$Replace$DTO> {
    if ($replace$.id) {
      return this.httpClient.put<$Replace$DTO>(\`\${ this.ROUTES.store } \`, { $replace$ });
    } else {
      return this.httpClient.post<$Replace$DTO>(\`\${ this.ROUTES.store } \`, { $replace$ });
    }
  }

  public delete(id: number): Observable<any> {
    let params = { id: "" + id };
    return this.httpClient.delete(this.ROUTES.destroy, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }
}
`;