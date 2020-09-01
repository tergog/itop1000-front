import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { termsData, privacyData } from 'app/constants/terms-pages-data';

@Component({
  selector: 'app-terms-pages',
  templateUrl: './terms-pages.component.html',
  styleUrls: ['./terms-pages.component.scss'],
})
export class TermsPagesComponent implements OnInit {
  constructor(private router: Router) {}

  data;

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    const { url } = this.router;
    if (url === '/terms') {
      this.data = termsData;
    } else if (url === '/privacy') {
      this.data = privacyData;
    }
  }
}
