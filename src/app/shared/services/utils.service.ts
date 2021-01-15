import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private emailPattern = /(^$|(^([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
  private forbiddenSymbolsEmailRegex = /[~`{}/|?!№#$%^&*":;,[\]<>()=']/gi;

  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
  private checkCyrillic = /[а-яА-ЯёЁ]/gi;

  private linkPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  constructor() { }

  public emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = new RegExp(this.emailPattern).test(control.value);
      const excludeCyrillic = new RegExp(this.checkCyrillic).test(control.value);
      return forbidden && !excludeCyrillic ? null : { emailInvalid: true };
    };
  }

  public specialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = new RegExp(this.forbiddenSymbolsEmailRegex).test(control.value);
      return !forbidden ? null : { specialCharacter: true };
    };
  }

  public passwordCombinationValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value ? control.value.trim() : '';
      const result = new RegExp(this.passwordPattern).test(value);
      const excludeCyrillic = new RegExp(this.checkCyrillic).test(value);
      return result && !excludeCyrillic ? null : { passwordValidation: true };
    };
  }

  public passwordMatchValidator(firstFieldValue): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value ? control.value.trim() : '';
      return value === firstFieldValue.value && value.length === firstFieldValue.value.length
        ? null
        : { passwordsNotMatch: true };
    };
  }

  public linkValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const result = new RegExp(this.linkPattern).test(control.value);
      return result ? null : { linkInvalid: true };
    };
  }
}
