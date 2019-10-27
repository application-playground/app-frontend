import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  
  @Input() modelTitle: any = 0;
  
  constructor(private modalService: BsModalService, private bsModalRef: BsModalRef) {

  }

  ngOnInit() {
  }

  close() {
    this.modalService.setDismissReason('false');
    this.bsModalRef.hide();
  }

  deleteInformation(ev: Event) {
    
  }

}
