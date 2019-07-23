import { BreadCrumb } from './../../Model/breadcrumb.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {

  breadCrumbSource: any[]= [];
  constructor() {

     //[{ name: 'Home', URL : 'template' }, { name: 'Gallery', URL : '' }, { name: 'Lightbox', URL : '' , active: true }]
    this.breadCrumbSource.push(new BreadCrumb('Home','template',false));
    this.breadCrumbSource.push(new BreadCrumb('Gallery','',false));
    this.breadCrumbSource.push(new BreadCrumb('Lightbox', '', true));
    
   }

  ngOnInit() {
  }

}
