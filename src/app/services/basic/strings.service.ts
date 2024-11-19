import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StringsService {
  formatPhoneNumberRuntime: any;

  constructor() { }

  validateEmail(email: string){
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  getOnlyDigits(phoneNumber: { toString: () => any; }) {
    const numberString = phoneNumber.toString();
    const numberInDigits = numberString.replace(/[^\d]/g,'');
    const numberVal = parseInt(numberInDigits, 10);
    return numberVal.toString();
  }

  isPhoneNumberValid(n: { toString: () => any; }) {
    const validPhoneNumber = this.getOnlyDigits(n);
    // remove trailing zeros
    const s = validPhoneNumber.toString();
    return (validPhoneNumber.toString().length < 10) ? false : true;
  }

  capitalizeEachFirst(str: string) {
    if(!str) {return '';}
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  capitalizeAllLetters(str: string) {
    if(!str) {return '';}
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
        const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  parseAddressFromProfile(user: { apartment: any; street_address: any; city: any; state: any; zip_code: any; }) {
    return `${user.apartment || ''} ${user.street_address || ''} ${user.city || ''} ${user.state || ''} ${user.zip_code || ''}`;
  }

  parseName(input: any, returnObject = false) {

    const capitalize = (s: string) => {
      if (typeof s !== 'string') {return '';}
      s = s.toLowerCase();
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const fullName = input || '';
    const result: any = {};

    if (fullName.length > 0) {
      let nameTokens = fullName.match(/\w*/g) || [];
      nameTokens = nameTokens.filter((n: any) => n);

      if (nameTokens.length > 3) {
        result.firstName = nameTokens.slice(0, 2).join(' ');
        result.firstName = capitalize(result.firstName);
      } else {
        result.firstName = nameTokens.slice(0, 1).join(' ');
        result.firstName = capitalize(result.firstName);
      }

      if (nameTokens.length > 2) {
        result.middleName = nameTokens.slice(-2, -1).join(' ');
        result.lastName = nameTokens.slice(-1).join(' ');
        result.middleName = capitalize(result.middleName);
        result.lastName = capitalize(result.lastName);
      } else {
        if (nameTokens.length === 1) {
          result.lastName = '';
          result.middleName = '';
        } else {
          result.lastName = nameTokens.slice(-1).join(' ');
          result.lastName = capitalize(result.lastName);
          result.middleName = '';
        }

      }
    }


    const displayName = result.lastName + (result.lastName ? ' ' : '') + result.firstName;
    return returnObject ? result : displayName;
  }

  isLastNameExist(input: any) {
    const fullname = this.parseName(input, true);
    return !(fullname.lastName === '');
  }

  numDigits(x: number) {
    const result = Math.log(x) * Math.LOG10E + 1;
    return result || 0;
  }

  // formatPhoneNumberRuntime(phoneNumber: string | null) {

  //   if (phoneNumber == null || phoneNumber === '') { return phoneNumber; }
  //   const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  //   // only keep number and +
  //   const p1 = cleaned.match(/\d+/g);
  //   if (p1 == null) { return cleaned; }
  //   const p2 = phoneNumber.match(/\d+/g).map(Number);
  //   const len = this.numDigits(p2);
  //   // document.write(len + " " );
  //   switch (len) {
  //     case 1:
  //     case 2:
  //       return '(' + phoneNumber.toString();
  //     case 3:
  //       return '(' + phoneNumber.toString() + ')';
  //     case 4:
  //     case 5:
  //     case 6:
  //       let f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
  //       let f2 = phoneNumber.toString().substring(len, 3);
  //       return f1 + ' ' + f2;
  //     case 7:
  //     case 8:
  //     case 9:
  //     case 10:
  //       f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
  //       f2 = phoneNumber.toString().substring(6, 3);
  //       const f3 = phoneNumber.toString().substring(len + 1, 6);
  //       return f1 + ' ' + f2 + '-' + f3;
  //     default:
  //       phoneNumber = phoneNumber.replace(/\D/g, '').substr(phoneNumber.length - 10);
  //       f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
  //       f2 = phoneNumber.toString().substring(6, 3);
  //       const f4 = phoneNumber.toString().substring(len, 4);
  //       return f1 + ' ' + f2 + '-' + f4;

  //   }


  //   // return "len";

  // }



}
