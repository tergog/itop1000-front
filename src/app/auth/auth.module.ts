import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogInComponent } from 'app/auth/components/log-in/log-in.component';
import { SignUpComponent } from 'app/auth/components/sign-up/sign-up.component';
import { SharedModule } from 'app/shared/shared.module';
import { AuthContainerComponent } from 'app/auth/components/auth-container/auth-container.component';
import { VerifyEmailComponent } from 'app/auth/components/verify-email/verify-email.component';
import { TermsPopupComponent } from './components/popups/terms-popup/terms-popup.component';
import { EmailPopupComponent } from './components/popups/email-popup/email-popup.component';


const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  declarations: [LogInComponent, SignUpComponent, AuthContainerComponent, VerifyEmailComponent, TermsPopupComponent, EmailPopupComponent],
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      SharedModule,
    ]
})
export class AuthModule { }
