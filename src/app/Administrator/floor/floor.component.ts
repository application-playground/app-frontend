import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { BreadCrumb } from 'src/app/Model/breadcrumb.model';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PageModel } from 'src/app/Model/page.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { AddRecordComponent } from '../add-record/add-record.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit, AfterViewInit {


  constructor(private floorService: FloorService, public dialog: MatDialog, private modalService: BsModalService) {
    // [{ name: 'Home', URL : 'template' }, { name: 'Gallery', URL : '' }, { name: 'Lightbox', URL : '' , active: true }]
    this.breadCrumbSource.push(new BreadCrumb('Home', 'template', false));
    this.breadCrumbSource.push(new BreadCrumb('Floor', '', true));
    // this.breadCrumbSource.push(new BreadCrumb('Lightbox', '', true));

  }

  MyDataSource: any;
  exportDataSource: any;
  displayedColumns: string[] = ['position', 'name', 'detail', 'deleteRecord'];
  breadCrumbSource: any[] = [];

  modalRef: BsModalRef;
  subscription = new Subscription();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  page: PageModel = new PageModel();
  @ViewChild(MatSort, { static : false }) sort: MatSort;
  sortType = 'asc';
  sortParam: any = 'name';

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
      this.page.sortFields = 'name,asc';
    }

    this.floorService.getFloorPagination('floor/list', this.page).subscribe((res) => {

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
    this.page.sortFields = data.param + ',' + data.type;
    this.page.size = 10;
    this.page.pageNumber = 0;
    this.RenderDataTable();
  }

  exportCsv() {
    let exportData: any;
    this.floorService.exportCSV('floor/exportCSV').subscribe((res) => {

        this.exportDataSource = new MatTableDataSource();
        this.exportDataSource.data = res['message'];
        this.exportDataSource.connect().subscribe(d => exportData = d);
    },
      error => { console.log('There was an error while retrieving Data !!!' + error); },
      () => {
        new Angular5Csv(exportData, 'Floor_Information_' + new Date().toString());
        /* TODO Here; */
}
    );
  }

  doFilter = (value: string) => {
    // this.MyDataSource.filter = value.trim().toLocaleLowerCase();
    this.page.search = value.trim().toLocaleLowerCase();
    this.RenderDataTable();
  }

  addRercord() {

    // { class: 'modal-dialog-centered modal-dialog', animated: true, keyboard: false, backdrop: 'static', ignoreBackdropClick: true }

    // const initialState = { list: data, updateName: true };
    // { initialState, keyboard: false, backdrop: 'static', animated: true, ignoreBackdropClick: true })

    const initialState = { modelTitle: 'Add Floor Informations' };
    this.modalRef = this.modalService.show(AddRecordComponent, { initialState, backdrop: 'static', keyboard: false });
    this.subscription = this.modalService.onHide.subscribe(data => {
      if (data === 'true') {
          // tslint:disable-next-line: no-trailing-whitespace
          // TODO Here; Close Popups          
      }
      this.subscription.unsubscribe();
    });
  }

  editRecord(ev: Event, modelObject: any) {
    const initialState = { modelTitle: 'Update Floor Informations' };
    this.modalRef = this.modalService.show(AddRecordComponent, { initialState, backdrop: 'static', keyboard: false });
    this.subscription = this.modalService.onHide.subscribe(data => {
      if (data === 'true') {
          // TODO Here; Close Popups
      }
      this.subscription.unsubscribe();
    });
  }

  deleteRecord(ev: Event, modelObject: any) {
    const initialState = { modelTitle: 'Delete Floor Informations' };
    this.modalRef = this.modalService.show(DeleteComponent, { initialState, backdrop: 'static', keyboard: false });
    this.subscription = this.modalService.onHide.subscribe(data => {
      if (data === 'true') {
        alert(data);
          // TODO Here; Close Popups
      }
      this.subscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
