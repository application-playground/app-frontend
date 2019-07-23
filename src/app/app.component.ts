import { Component, AfterViewInit, OnInit } from '@angular/core';
import { JavascriptLoaderService } from './shared/Services/javascript-loader.service';
import { Router } from '@angular/router';

//declare var jQuery: any; 
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'app-frontend';

  constructor(private dynamicScriptLoader: JavascriptLoaderService, private route: Router) { }

  ngOnInit() {    
    
  }

  ngAfterViewInit() {      
    // this.loadScripts();
    // ($('#side-menu')).metisMenu();
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('JQuery-2.1.1','bootstrap', 'pace', 'metisMenu').then(data => {
      // Script Loaded Successfully
      console.log('script loaded successfully');
    }).catch(error => console.log(error));
  }

}
