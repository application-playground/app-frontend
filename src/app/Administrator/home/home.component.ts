import { JavascriptLoaderService } from './../../shared/Services/javascript-loader.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var jQuery: any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private dynamicScriptLoader: JavascriptLoaderService) { }

  ngOnInit() {    
  }

  ngAfterViewInit() {  
    this.loadScripts();
    jQuery('#side-menu').metisMenu();
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('JQuery-2.1.1','bootstrap', 'metisMenu').then(data => {
      // Script Loaded Successfully
      console.log('script loaded successfully');
    }).catch(error => console.log(error));
  }
}
