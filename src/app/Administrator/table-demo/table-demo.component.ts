import { Component, OnInit } from '@angular/core';
import { BreadCrumb } from 'src/app/Model/breadcrumb.model';
declare var jQuery: any;

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent implements OnInit {

  breadCrumbSource: any[] = [];
  constructor() {

    //[{ name: 'Home', URL : 'template' }, { name: 'Gallery', URL : '' }, { name: 'Lightbox', URL : '' , active: true }]
    this.breadCrumbSource.push(new BreadCrumb('Home', 'template', false));
    this.breadCrumbSource.push(new BreadCrumb('Tables', '', false));
    this.breadCrumbSource.push(new BreadCrumb('Data Tables', '', true));

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    jQuery(document).ready(function () {
      jQuery('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
          { extend: 'copy' },
          { extend: 'csv' },
          { extend: 'excel', title: 'ExampleFile' },
          { extend: 'pdf', title: 'ExampleFile' },

          {
            extend: 'print',
            customize: function (win) {
              jQuery(win.document.body).addClass('white-bg');
              jQuery(win.document.body).css('font-size', '10px');

              jQuery(win.document.body).find('table')
                .addClass('compact')
                .css('font-size', 'inherit');
            }
          }
        ]

      });

      /* Init DataTables */
      var oTable = jQuery('#editable').DataTable();

      /* Apply the jEditable handlers to the table */
      oTable.$('td').editable('../example_ajax.php', {
        "callback": function (sValue, y) {
          var aPos = oTable.fnGetPosition(this);
          oTable.fnUpdate(sValue, aPos[0], aPos[1]);
        },
        "submitdata": function (value, settings) {
          return {
            "row_id": this.parentNode.getAttribute('id'),
            "column": oTable.fnGetPosition(this)[2]
          };
        },

        "width": "90%",
        "height": "100%"
      });


    });

  }

  public fnClickAddRow() {
    jQuery('#editable').dataTable().fnAddData([
      "Custom row", "New row", "New row", "New row", "New row"]);
  }

}
