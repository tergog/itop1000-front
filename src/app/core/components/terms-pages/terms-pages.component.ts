import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { termsData, privacyData } from 'app/constants/terms-pages-data';

@Component({
  selector: 'app-terms-pages',
  templateUrl: './terms-pages.component.html',
  styleUrls: ['./terms-pages.component.scss'],
})
export class TermsPagesComponent implements OnInit {
  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public type: object) {}

  data;

  ngOnInit(): void {
    this.data = this.type;
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
