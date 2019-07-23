
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
    // this.loadScripts();
    // jQuery('#side-menu').metisMenu();   

    // Minimalize menu
    jQuery('.navbar-minimalize').click(function () {
      jQuery("body").toggleClass("mini-navbar");

      if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        jQuery('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
          function () {
            jQuery('#side-menu').fadeIn(400);
          }, 200);
      } else if (jQuery('body').hasClass('fixed-sidebar')) {
        jQuery('#side-menu').hide();
        setTimeout(
          function () {
            jQuery('#side-menu').fadeIn(400);
          }, 100);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        jQuery('#side-menu').removeAttr('style');
      }

    });

  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('JQuery-2.1.1', 'metisMenu').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
