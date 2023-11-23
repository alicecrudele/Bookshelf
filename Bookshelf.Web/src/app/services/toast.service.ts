import { Injectable } from "@angular/core";
import { PopupRef, PopupService } from "@progress/kendo-angular-popup";
import { ToastComponent } from "../components/toast/toast.component";
import { ToastMessage, ToastType } from "../classes/toastMessage";
import * as $ from 'jquery';

@Injectable()
export class ToastService {

  private toasts: Array<PopupRef>;
  private initialBottomOffset = 0;
  private toastHeight = 110;

  constructor(private popupService: PopupService) {
    this.toasts = [];
  }

  public openToasts(toastMessages: ToastMessage[]) {
    const externalThis = this;
    toastMessages.forEach((val) => {
      externalThis.openToast(val.type, val.message);
    });
  }

  public openToastMessage(toast: ToastMessage) {
    this.openToast(toast.type, toast.message);
  }

  public openToast(type: ToastType, message: string) {
    $('#toast-popup-container').css('width', '50px');

    let bottomOffset = this.initialBottomOffset;

    for (const instance of this.toasts) {
      bottomOffset = bottomOffset - this.toastHeight;
    }

    const popup = this.popupService.open({
      content: ToastComponent,
      positionMode: 'absolute',
      animate: true,
      popupClass: 'top-most',
      offset: { left: 0, top: bottomOffset }
    });

    $('kendo-popup:has(toast)').addClass('kendo-toast-popup');

    popup.content.instance.type = type;
    popup.content.instance.message = message;
    popup.content.instance.popupRef = popup;
    popup.content.instance.closeEvent.subscribe((instance: PopupRef) => {
      this.closePopup(instance);
    });

    this.toasts.push(popup);

    setTimeout((instance: PopupRef = popup) =>
      this.closePopup(instance),
      5000);
  }

  private closePopup(instance: PopupRef) {
    if (this.toasts.indexOf(instance) >= 0) {
      instance.close();
      this.toasts.splice(this.toasts.indexOf(instance), 1);
      this.resetToastsPosition();
    }
  }

  private resetToastsPosition() {
    const bottomOffset = this.initialBottomOffset - this.toastHeight;
    let index = 0;
    for (const instance of this.toasts) {
      instance.popupElement.style.top = (bottomOffset * index++ + 'px');
    }

    if (this.toasts.length === 0) {
      $('#toast-popup-container').css('width', '0');
    }
  }

}
