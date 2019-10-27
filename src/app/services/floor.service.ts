import { PageModel } from 'src/app/Model/page.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Floor } from '../Model/floor.model';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private context: string = "";
  constructor(private http: HttpClient) {
    this.context = environment.API_URL;
  }

  getAll() {
    return this.http.get<Floor[]>(`/floor`);
  }

  getFloorPagination(requestURL: string, page: PageModel) {    
    return this.http.get(this.context + requestURL, {
      params: new HttpParams()
        // .set('courseId', courseId.toString())
        .set('pageNumber', page.pageNumber.toString())
        .set('pageSize', page.size.toString())
        .set('search', page.search)
        .set('sortOrder', page.sortFields)
    });
  }

  exportCSV(requestURL: string) {    
    return this.http.get(this.context + requestURL);
  }

  createBlock(floorRecord: Floor) {    
    return this.http.post(this.context + 'floor/create', floorRecord);
  }

  delete(id: number) {
    return this.http.delete(`/floor/${id}`);
  }
}
