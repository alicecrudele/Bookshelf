import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILabel } from "../interfaces/label.interface";
import { SessionService } from "./session.service";
import { RepositoryService } from "./repository.service";

@Injectable()
export class CommonService {

  //public gridFilterSelected: FilterType = FilterType.Waiting;
  //private resources$: Observable<ILabel[]>;

  constructor(private sessionSvc: SessionService, private repositorySvc: RepositoryService) { }

  //public initializeLabelsObs(): Observable<ILabel[] | void> {
  //  if (!this.resources$ && this.sessionSvc.hasLabels()) {
  //    this.resources$ = of<ILabel[]>([]);
  //  } else if (!this.resources$ && !this.sessionSvc.hasLabels()) {
  //    this.resources$ = this.repositorySvc.getAllLabelsObs().pipe(
  //      tap((result: ILabel[]) => this.sessionSvc.setLabels(result))
  //    );
  //  }

  //  return this.resources$.pipe(
  //    tap(() => this.resources$ = undefined, () => this.resources$ = undefined),
  //    share()
  //  );
  //}

  public initializeLabels() {
  //  let defer: Promise<any>;
  //  defer = new Promise<void>((resolve, reject) => {
  //    if (this.sessionSvc.hasLabels()) {
  //      resolve();
  //    } else {
  //      this.repositorySvc.getAllLabels<ILabel[]>().then(
  //        result => {
  //          this.sessionSvc.setLabels(result);
  //          resolve();
  //        },
  //        error => {
  //          reject();
  //        }
  //      );
  //    }
  //  });
  //  return defer;
  }

  //public setGridFilterSelected(value: FilterType) {
  //  this.gridFilterSelected = value;
  //}

  //public getGridFilterSelected(): FilterType {
  //  return this.gridFilterSelected;
  //}
}
