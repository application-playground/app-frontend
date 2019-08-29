import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreadCrumb } from 'src/app/Model/breadcrumb.model';
import { PageModel } from 'src/app/Model/page.model';

declare var jQuery: any;
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, AfterViewInit {

  MyDataSource: any;
  displayedColumns: string[] = ['name', 'email'];
  breadCrumbSource: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  page: PageModel = new PageModel();

  constructor(private userService: UserService) {
    // [{ name: 'Home', URL : 'template' }, { name: 'Gallery', URL : '' }, { name: 'Lightbox', URL : '' , active: true }]
    this.breadCrumbSource.push(new BreadCrumb('Home', 'template', false));
    this.breadCrumbSource.push(new BreadCrumb('Gallery', '', false));
    this.breadCrumbSource.push(new BreadCrumb('Lightbox', '', true));

    this.page.size = 20;
    this.page.pageNumber = 1;
  }

  ngOnInit() {
    this.RenderDataTable();
  }

  RenderDataTable() {
    this.userService.getRegistrationData('users/list', this.page).subscribe((res) => {

      if (!res['error']) {

        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = res["message"];
        this.page.totalElements = res['totalElement'];
        this.MyDataSource.paginator = this.paginator;
        console.log(this.MyDataSource.data);
      }
    },
      error => {
        console.log('There was an error while retrieving Data !!!' + error);
      });
  }

  ngAfterViewInit() { }
}

