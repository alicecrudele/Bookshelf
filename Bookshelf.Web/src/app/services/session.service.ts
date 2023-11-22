import { Injectable, Inject, EventEmitter, Output, Directive } from '@angular/core';
import { ConstantHelper } from '../helpers/constant.helper';
import { ILabel } from '../interfaces/label.interface';

@Directive()
@Injectable()
export class SessionService {
  private _baseUrl: string;
  private _labels: { [key: string]: string } = {};
 

  public autosaveInterval: any = null;

  

  constructor(private constantHelper: ConstantHelper, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    
  }

  public clearAutosave() {
    if (this.autosaveInterval != null) {
      clearInterval(this.autosaveInterval);
      this.autosaveInterval = null;
    }
  }

  getBaseUrl() {
    return this._baseUrl;
  }

  public getLanguage() {
    let element: any = document.getElementById('LanguageCode');
    let languageCode: string;

    if (element != undefined) {
      languageCode = element.value;

      let lang = languageCode.slice(0, 2);
      return lang;
    }

    return 'en';
  }

  // Common functions

  public hasLabels(): boolean {
    return (Object.keys(this._labels).length > 0);
  }

  public setLabels(labelList: Array<ILabel>) {
    let l = labelList.length;
    for (let i = 0; i < l; i++) {
      this._labels[labelList[i].name] = labelList[i].description;
    }
  }

  public getLabel(key: string, opt?: string[] | number[]) {
    if (this._labels[key] != undefined) {
      let resource = this._labels[key];
      if (opt != undefined) {
        opt.forEach((val: string | number, index: number) => resource = resource.replace(`{${index}}`, val as string));
      }
      return resource;
    }
    return '[' + key + ']';
  }

  
}
