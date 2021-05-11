import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blurEmail'
})
export class BlurEmailPipe implements PipeTransform {

  transform(email: string): string {
    const nameEmail = email.split("@")[0]
    const blurNameEmail = nameEmail[0] + '***' + nameEmail[nameEmail.length - 1]
    return blurNameEmail + "@" + email.split("@")[1]
  }

}
