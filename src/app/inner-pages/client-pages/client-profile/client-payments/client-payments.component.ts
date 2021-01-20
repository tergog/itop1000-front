import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-client-payments',
  templateUrl: './client-payments.component.html',
  styleUrls: ['./client-payments.component.scss']
})
export class ClientPaymentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [' date', 'recharge', 'balance'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  public chargesList: Array<object> = [];
  public errorMessage: string;
  public ngUnsubscribe$ = new Subject<void>();

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getChargesList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getChargesList(): void {
    this.paymentService.getChargesList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (chargesList) => this.chargesList = chargesList,
        ({ error }) => this.errorMessage = error.message
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}

const ELEMENT_DATA = [
  { date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00' },
  { date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00' },
  { date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00' },
  { date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00' },
  { date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00' },
  { date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00' },
  { date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00' },
  { date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00' },
  { date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00' },
  { date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00' },
  { date: 'Dec 18, 2019', recharge: 'Conceptual Sketches, 5 sketches total (2-3 illustrations)', balance: '$100.00' },
  { date: 'Mar 11, 2019', recharge: 'Final of illustrations', balance: '$50.00' }
];
