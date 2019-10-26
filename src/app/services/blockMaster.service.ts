import { PageModel } from 'src/app/Model/page.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Block } from '../Model/block.model';

@Injectable({
  providedIn: 'root'
})
export class BlockMasterService {
  private context: string = "";
  constructor(private http: HttpClient) {
    this.context = environment.API_URL;
  }

  getAll() {
    return this.http.get<Block[]>(`/block`);
  }

  getBlockPagination(requestURL: string, page: PageModel) {    
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

  createBlock(user: Block) {    
    return this.http.post(this.context + 'block/create', user);
  }

  delete(id: number) {
    return this.http.delete(`/block/${id}`);
  }
}
