import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreadCrumb } from 'src/app/Model/breadcrumb.model';
import { PageModel } from 'src/app/Model/page.model';
import { MatSort } from '@angular/material/sort';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

declare var jQuery: any;
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, AfterViewInit {

  MyDataSource: any;
  exportDataSource: any;
  displayedColumns: string[] = ['name', 'email'];
  breadCrumbSource: any[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  page: PageModel = new PageModel();
  @ViewChild(MatSort, { static : false }) sort: MatSort;

  constructor(private userService: UserService) {
    // [{ name: 'Home', URL : 'template' }, { name: 'Gallery', URL : '' }, { name: 'Lightbox', URL : '' , active: true }]
    this.breadCrumbSource.push(new BreadCrumb('Home', 'template', false));
    this.breadCrumbSource.push(new BreadCrumb('Gallery', '', false));
    this.breadCrumbSource.push(new BreadCrumb('Lightbox', '', true));

  }

  ngOnInit() {
    this.page.size = 10;
    this.page.pageNumber = 0;
    this.RenderDataTable();
  }

  pageEvent(ev: PageEvent) {
    this.page.pageNumber = ev.pageIndex;
    this.page.size = ev.pageSize;
    this.RenderDataTable();
  }

  RenderDataTable() {    
    if (this.page.sortFields === undefined) {
      this.page.sortFields = 'name,desc';
    }

    this.userService.getRegistrationData('users/list', this.page).subscribe((res) => {
      
      if (!res['error']) {

        this.page.totalElements = res['totalElement'];
        this.page.totalPages = res['pages'];
        this.page.numberOfElements = res['totalElement'];

        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = res['message'];


        // console.log(this.MyDataSource.data);
      }
    },
      error => {
        console.log('There was an error while retrieving Data !!!' + error);
      });
  }

  ngAfterViewInit() {    
    if (this.MyDataSource != undefined) {
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    }
  }
  sortType: string = 'desc';
  sortParam: any = 'name';  

  sortItem(sortParam) {
    if (this.sortType === 'desc') {
        this.sortType = 'asc';
    } else if (this.sortType === 'asc') {
        this.sortType = 'desc';
    }
    this.sortParam = sortParam;
    const data = {
        type: this.sortType,
        param: this.sortParam
    };
    this.page.sortFields = data.param + "," + data.type;    
    this.page.size = 10;
    this.page.pageNumber = 0;
    this.RenderDataTable();
  }

  exportCsv() {
    let exportData: any;
    this.userService.exportCSV('users/exportCSV').subscribe((res) => {
    
        this.exportDataSource = new MatTableDataSource();
        this.exportDataSource.data = res['message'];
        this.exportDataSource.connect().subscribe(d => exportData = d);
    },
      error => { console.log('There was an error while retrieving Data !!!' + error); },
      () => {
        new Angular5Csv(exportData,'USER_Information_'+ new Date().toString());
        /* TODO Here; */
}
    );
  }

  doFilter = (value: string) => {
    // this.MyDataSource.filter = value.trim().toLocaleLowerCase();
    this.page.search = value.trim().toLocaleLowerCase();
    this.RenderDataTable();
  }
}

