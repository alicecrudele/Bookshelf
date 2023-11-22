
export class ToastMessage {
  constructor(
    public type: ToastType,
    public message: string
  ) { }
}


export enum ToastType {
  Success = 'SUCCESS',
  Warning = 'WARNING',
  Error = 'ERROR',
  ServerError = 'SERVERERROR'
}
