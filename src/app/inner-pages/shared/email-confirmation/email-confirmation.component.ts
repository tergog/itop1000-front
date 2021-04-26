import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  nameDevelop: string = "Karina"

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  handleClickButton() {
    this.router.navigate(["landing/freelancer"])
  }

}
