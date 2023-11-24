import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { CommonHelper } from "../helpers/common.helper";
import { ConstantHelper } from "../helpers/constant.helper";

const httpOptions = {
  headers: new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
  })
};

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{1,3})?(Z)?$/;

@Injectable()
export class RepositoryService {
  
  private baseUrl: string;

  constructor(private http: HttpClient, private constantHelper: ConstantHelper, private commonHelper: CommonHelper, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  //#region BOOK

  public getBookList<T>() {
    return this.getWithLinkBase<T>(this.http, this.constantHelper.DATA_GET_BOOK_LIST, null);
  }

  public getBook<T>(id: number) {
    return this.getWithLinkBase<T>(this.http, this.constantHelper.DATA_GET_BOOK + '/' + id, null);
  }

  public createBook<T>(data: T) {
    return this.postWithLinkBase<T>(this.http, this.constantHelper.DATA_CREATE_BOOK, data, null);
  }

  public updateBook<T>(id:number, data: T) {
    return this.putWithLinkBase<T>(this.http, this.constantHelper.DATA_UPDATE_BOOK + '/' + id, data, null);
  }

  public deleteBook<T>(id:number, data: T) {
    return this.deleteWithLinkBase<T>(this.http, this.constantHelper.DATA_DELETE_BOOK + '/' + id, null);
  }

  public getBookGenreList<T>() {
    return this.getWithLinkBase<T>(this.http, this.constantHelper.DATA_GET_BOOK_GENRE_LIST, null);
  }

  //#endregion

  //#region login

  public getUser<T>() {
    throw new Error('Method not implemented.');
  }

  //#endregion


  //#region LABEL
  public getAllLabels<T>() {
    throw new Error('Method not implemented.');
  }

  //#endregion



  //#region BASE

  private getWithLinkBase<T>(http: HttpClient, link: string, parameters: any) {
    return http.get<T>(this.baseUrl + link + this.commonHelper.buildQueryString(parameters), httpOptions);
  }

  private putWithLinkBase<T>(http: HttpClient, link: string, data: T, parameters: any) {
    return http.put<T>(this.baseUrl + link + this.commonHelper.buildQueryString(parameters), data, httpOptions);
  }

  private postWithLinkBase<T>(http: HttpClient, link: string, data: T, parameters: any) {
    return http.post<T>(this.baseUrl + link + this.commonHelper.buildQueryString(parameters), data, httpOptions);
  }

  private deleteWithLinkBase<T>(http: HttpClient, link: string, parameters: any) {
    return http.delete(this.baseUrl + link + this.commonHelper.buildQueryString(parameters), httpOptions);
  }

  //#endregion
 
}
