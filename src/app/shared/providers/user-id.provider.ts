import { InjectionToken, Provider } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

export const USER_ID = new InjectionToken<string>(
  'A user id',
);

export const USER_ID_PROVIDER: Provider = {
  provide: USER_ID,
  useFactory: userIdFactory
};

export function userIdFactory(): string {
  const token = localStorage.getItem('token');
  if (token) {
    return jwtDecode(token).id;
  }
  return null;
}
