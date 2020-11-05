import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-payments',
  templateUrl: './client-payments.component.html',
  styleUrls: ['./client-payments.component.scss']
})
export class ClientPaymentsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'recharge', 'balance'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

const ELEMENT_DATA = [
  {date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00'},
  {date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00'},
  {date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00'},
  {date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00'},
  {date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00'},
  {date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00'},
  {date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00'},
  {date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00'},
  {date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00'},
  {date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00'},
  {date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00'},
  {date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00'}
]
