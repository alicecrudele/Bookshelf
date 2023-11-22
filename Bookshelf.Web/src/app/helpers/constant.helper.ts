import { Injectable } from '@angular/core';

@Injectable()
export class ConstantHelper {

  //Chiamate API

  //#region BOOK

  DATA_GET_BOOK_LIST = 'api/book/GetBookList';
  DATA_GET_BOOK = 'api/book/GetBook';
  DATA_CREATE_BOOK = 'api/book/CreateBook';
  DATA_UPDATE_BOOK = 'api/book/UpdateBook';
  DATA_DELETE_BOOK = 'api/book/DeleteBook';
  DATA_GET_BOOK_GENRE_LIST = 'api/book/GetBookGenreList';
  //#endregion


  //#region LABEL
  DATA_GET_ALL_LABELS = 'api/common/GetLabels';
  //#endregion


  //#region TOAST
  LBL_TOAST_ERROR = 'toast.error';                                                       // Error
  LBL_TOAST_WARNING = 'toast.warning';                                                   // Warning
  LBL_TOAST_INFO = 'toast.info';                                                         // Info

  //#endregion


}
