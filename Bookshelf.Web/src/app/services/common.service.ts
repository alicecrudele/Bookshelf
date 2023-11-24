import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILabel } from "../interfaces/label.interface";
import { SessionService } from "./session.service";
import { RepositoryService } from "./repository.service";

@Injectable()
export class CommonService {

  constructor(private sessionSvc: SessionService, private repositorySvc: RepositoryService) { }


  public initializeLabels() {
  
  }

}
