import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from './PeriodicElement.model';
import { BreadCrumb } from 'src/app/Model/breadcrumb.model';
import { PageModel } from 'src/app/Model/page.model';

declare var jQuery: any;
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  breadCrumbSource: any[] = [];
  page: PageModel = new PageModel();

  constructor(private userService: UserService) {
    // [{ name: 'Home', URL : 'template' }, { name: 'Gallery', URL : '' }, { name: 'Lightbox', URL : '' , active: true }]
    this.breadCrumbSource.push(new BreadCrumb('Home', 'template', false));
    this.breadCrumbSource.push(new BreadCrumb('Gallery', '', false));
    this.breadCrumbSource.push(new BreadCrumb('Lightbox', '', true));
   }

  ngOnInit() {

    // this.page.size = 3;
    // this.page.pageNumber = 0;
    // this.page.totalElements = 20;

  }

  ngAfterViewInit() {
    // this.paginator.pageSize = 3;
    // this.paginator.pageSizeOptions = [1, 2, 3, 4, 5];
    // this.paginator.pageIndex = 3;
    this.dataSource.paginator = this.paginator;
  }

  getRequestData(ev: Event) {
    console.log(ev);
    // tslint:disable-next-line: no-string-literal
    this.page.pageNumber = ev['pageIndex'] || 0;
    // tslint:disable-next-line: no-string-literal
    this.page.size = ev['pageSize'] || 0;
    // tslint:disable-next-line: no-string-literal
    this.page.totalElements = ev['length'] || 0;
    this.userService.getRegistrationData('users/list', this.page).subscribe((res) => {

      
      if (!res['error']) {
        this.paginator.pageSize = res['pages'] || 0;
        this.page.totalElements = res['totalElement'] || 0;
        console.log(res['message']);        
        this.dataSource = new MatTableDataSource<PeriodicElement>(res['message']);
        // this.dataSource.paginator = this.paginator;
      }
    });
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {  name: 'Hydrogen' },
  {  name: 'Helium' },
  {  name: 'Lithium' },
  {  name: 'Beryllium' },
  {  name: 'Boron' },
  {  name: 'Carbon' },
  {  name: 'Nitrogen' },
  {  name: 'Oxygen' },
  {  name: 'Fluorine' },
  {  name: 'Neon' },
  {  name: 'Sodium' },
  {  name: 'Magnesium' },
  {  name: 'Aluminum' },
  {  name: 'Silicon' },
  {  name: 'Phosphorus' },
  {  name: 'Sulfur' },
  {  name: 'Chlorine' },
  {  name: 'Argon' },
  {  name: 'Potassium' },
  {  name: 'Calcium' },
];
