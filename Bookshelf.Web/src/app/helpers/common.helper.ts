import { Injectable } from '@angular/core';
import { formatDate, FormatWidth, getLocaleDateFormat } from '@angular/common';
import * as $ from 'jquery';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable()
export class CommonHelper {

  private loadingSubcriber: Array<any> = [];

  constructor() { }

  public buildQueryString(parameters: any) {
    let qs = '';

    if (parameters !== undefined) {
      for (const key in parameters) {
        if (qs === '') {
          qs += '?' + key + '=' + encodeURIComponent(parameters[key]);
        } else {
          qs += '&' + key + '=' + encodeURIComponent(parameters[key]);
        }
      }
    }

    return qs;
  }

  public stringFormat(s: string, args: string[]): string {
    for (var i = 0; i < args.length; i++) {
      s = s.replace('{' + i + '}', args[i]);
    }
    return s;
  }

  public dateTimeReviver(key: any, value: string | number | Date): any {
    const dateRegex = new RegExp(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/, 'g');
    if (typeof value === 'string' && value.match(dateRegex)) {
      return new Date(value);
    }
    return value;
  }

  public isEmptyOrSpaces(str: { match: (arg0: RegExp) => null; } | null | undefined) {
    return str === null || str === undefined || str.match(/^ *$/) !== null;
  }

  public clone(object: any) {
    return JSON.parse(JSON.stringify(object));
  }

  // return list of changed value in fields
  public getChanges(oldObject: any, newObject: null, currentChangesList: any[]) {
    if (newObject == null) {
      return [];
    }

    const changedList: any[] = [];
    const oldJsonObject = JSON.parse(JSON.stringify(oldObject));
    const newJsonObject = JSON.parse(JSON.stringify(newObject));

    const keys = Object.keys(newJsonObject);

    for (const key in keys) {
      const keyName = keys[key];

      const oldJsonValue = oldJsonObject[keyName];
      const newJsonValue = newJsonObject[keyName];

      if (Object.prototype.toString.call(newJsonValue) === '[object Array]') {
        for (const nestedKey in newJsonValue) {

          const oldNestedObject = oldJsonObject[keyName][nestedKey];
          const newNestedObject = newJsonObject[keyName][nestedKey];

          if (oldNestedObject == undefined || newNestedObject == undefined) {
            changedList.push(keyName);
            continue;
          }

          const resultNestedList = this.getChanges(oldNestedObject, newNestedObject, changedList); // recursion

          if (resultNestedList.length == 0) {
            continue;
          }

          if (currentChangesList.find(c => c == keyName) || changedList.find(c => c == keyName)) {
            continue;
          }
          else {
            changedList.push(keyName);
          }

          // for (var resultNested in resultNestedList) {
          //  //var value = resultNestedList[resultNested];
          //  if (currentChangesList.find(c => c == keyName) || changedList.find(c => c == keyName))
          //    continue;
          //  else
          //    changedList.push(keyName);
          // }
        }
      } else if (Object.prototype.toString.call(newJsonValue) === '[object Object]') {

        // Recursive in every Object parameter
        const resultNestedList = this.getChanges(oldJsonValue, newJsonValue, changedList);
        if (resultNestedList.length == 0) {
          continue;
        }

        if (currentChangesList.find(c => c == keyName) || changedList.find(c => c == keyName)) {
          continue;
        }
        else {
          changedList.push(keyName);
        }

      } else if (oldJsonValue !== newJsonValue) {
        changedList.push(keyName);
      }
    }

    return changedList;
  }


  public showErrors(
    formGroup: FormGroup,
    resources: string[],
    labelPrefix: string,
    labelFunction: (label: string) => string,
    appLanguageCode: string = 'en-US'
  ): string[] {
    const validationErrors = [];

    if (formGroup.errors) {
      for (const err of Object.keys(formGroup.errors)) {
        const resourceKey = resources.find((r) => r == 'error.' + err.toLowerCase());
        if (resourceKey) {
          const req = labelFunction(resourceKey);
          let errorParam = null;
          switch (err) {
            case 'min':
              errorParam = formGroup.errors[err].min;
              break;
            case 'max':
              errorParam = formGroup.errors[err].max;
              break;
          }

          validationErrors.push(this.stringFormat(req, [labelFunction(`${labelPrefix}.form`), errorParam]));
        } else {
          validationErrors.push(labelFunction(`${labelPrefix}.form${err.substring(0, 1).toUpperCase()}${err.substring(1)}`));
        }
      }
    }

    for (const control of Object.keys(formGroup.controls)) {
        const formControl = formGroup.get(control);
        //if (!formControl.valid && !formControl.disabled) {
        //  if (formControl instanceof FormGroup || formControl instanceof FormArray) {
        //    validationErrors.push(...this.showErrors(formControl as FormGroup, resources, labelPrefix, labelFunction));
        //  } else {
        //    for (const err of Object.keys(formControl.errors)) {
        //      const resourceKey = resources.find((r) => r == 'error.' + err.toLowerCase());
        //      if (resourceKey) {
        //        const req = labelFunction(resourceKey);
        //        let errorParam = null;
        //        switch (err) {
        //          case 'min':
        //            errorParam = formControl.errors[err].min;
        //            break;
        //          case 'max':
        //            errorParam = formControl.errors[err].max;
        //            break;
        //        }
        //        if (errorParam instanceof Date) {
        //          const format = getLocaleDateFormat(appLanguageCode, FormatWidth.Short);
        //          errorParam = formatDate(errorParam, format, appLanguageCode);
        //        }

        //        validationErrors.push(this.stringFormat(req, [labelFunction(`${labelPrefix}.${control}`), errorParam]));
        //      } else {
        //        validationErrors.push(labelFunction(`${labelPrefix}.${control}${err.substring(0, 1).toUpperCase()}${err.substring(1)}`));
        //      }
        //    }
        //  }
        //}
      }

      return validationErrors;
    }

  }

