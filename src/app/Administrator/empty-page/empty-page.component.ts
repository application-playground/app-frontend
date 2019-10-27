import { BreadCrumb } from './../../Model/breadcrumb.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDemoComponent } from '../popup-demo/popup-demo.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddRecordComponent } from '../add-record/add-record.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {

  breadCrumbSource: any[] = [];
  
  modalRef: BsModalRef;  
  subscription = new Subscription();

  constructor(public dialog: MatDialog, private modalService: BsModalService) {

     //[{ name: 'Home', URL : 'template' }, { name: 'Gallery', URL : '' }, { name: 'Lightbox', URL : '' , active: true }]
    this.breadCrumbSource.push(new BreadCrumb('Home','template',false));
    this.breadCrumbSource.push(new BreadCrumb('Dashboard','',true));    
  }
  
  openDialog() {
    this.dialog.open(PopupDemoComponent, {
      data: 'Wonder'
    });
  }

  openModal() {

    // { class: 'modal-dialog-centered modal-dialog', animated: true, keyboard: false, backdrop: 'static', ignoreBackdropClick: true }

    // const initialState = { list: data, updateName: true };
    // { initialState, keyboard: false, backdrop: 'static', animated: true, ignoreBackdropClick: true })

    this.modalRef = this.modalService.show(AddRecordComponent, { backdrop: 'static', keyboard: false });
    this.subscription = this.modalService.onHide.subscribe(data => {
      if (data === 'true') {
          // TODO Here; Close Popups          
      }
      this.subscription.unsubscribe();
    });    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
