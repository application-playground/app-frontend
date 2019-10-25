import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-demo',
  templateUrl: './popup-demo.component.html',
  styleUrls: ['./popup-demo.component.scss']
})
export class PopupDemoComponent implements OnInit {
  passData: any = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.passData = data;
  }

  ngOnInit() {
  }

}
