import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  @Input() modelTitle: any = 0;

  constructor(private modalService: BsModalService, private bsModalRef: BsModalRef) {

  }

  ngOnInit() {
  }

  close() {
    this.modalService.setDismissReason('false');
    this.bsModalRef.hide();
}

}
