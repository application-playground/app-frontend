import { BreadCrumb } from './../../Model/breadcrumb.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input('title') title: any;  
  @Input() path: BreadCrumb[];
  constructor() { }

  ngOnInit() {    
    
  }

}
