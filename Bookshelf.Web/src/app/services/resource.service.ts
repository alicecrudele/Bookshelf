import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { RepositoryService } from '../services/repository.service';
import { ILabel } from '../interfaces/label.interface';

@Injectable()
export class ResourceService {
  private resources: { [key: string]: string; } = {};
  private resources$: Observable<ILabel[]> | undefined;

  constructor() {
  }

  
  public hasLabels(): boolean {
    return (Object.keys(this.resources).length > 0);
  }

  public setLabels(labelList: Array<ILabel>) {
    let l = labelList.length;
    for (let i = 0; i < l; i++) {
      this.resources[labelList[i].name] = labelList[i].description;
    }
  }

  public getLabel(key: string, opt?: string[] | number[]) {
    if (this.resources[key] != undefined) {
      let resource = this.resources[key];
      if (opt != undefined) {
        opt.forEach((val: string | number, index: number) => resource = resource.replace(`{${index}}`, val as string));
      }
      return resource;
    }
    return '[' + key + ']';
  }
}
