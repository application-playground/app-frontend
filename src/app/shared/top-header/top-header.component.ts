
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JavascriptLoaderService } from '../Services/javascript-loader.service';
declare var jQuery: any;

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit, AfterViewInit {

  constructor(private dynamicScriptLoader: JavascriptLoaderService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    
    this.loadScripts();
    jQuery('#side-menu').metisMenu();    
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('JQuery-2.1.1','metisMenu').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
