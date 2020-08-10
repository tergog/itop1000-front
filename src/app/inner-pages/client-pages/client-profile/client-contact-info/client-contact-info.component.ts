import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'app/shared/services';

@Component({
  selector: 'app-client-contact-info',
  templateUrl: './client-contact-info.component.html',
  styleUrls: ['./client-contact-info.component.scss']
})
export class ClientContactInfoComponent implements OnInit {

  public form: FormGroup;
  public isEdit: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  public onSaveClick(): void {
    this.userService.updateProfile(this.form.value)
      .subscribe();
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('Eugene', []),
      lastName: new FormControl('2', []),
      address: new FormControl('3', []),
      phone: new FormControl('', [])
    })
  }
}
