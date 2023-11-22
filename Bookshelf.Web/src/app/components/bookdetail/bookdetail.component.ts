import { Component } from '@angular/core';
import { Book } from '../../classes/book';
import { Observable } from 'rxjs';
import { GridConstantsConfig } from '../../interfaces/gridColumn.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonHelper } from '../../helpers/common.helper';
import { ToastType } from '../../classes/toastMessage';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent {
  formGroup: FormGroup | undefined;

  public gridData: Book[] | undefined;
  public originalData: Book[] | undefined;
  public constantsListener: Observable<GridConstantsConfig> | undefined;
  private bookId?: number;
  private book?: Book;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private repositorySvc: RepositoryService,
    private commonHelper: CommonHelper,
    private route: ActivatedRoute,
    private toastSvc: ToastService
  ) {
    this.route.params.subscribe(params => {
      if (params) {
        const paramId = params['id'];

        if (this.commonHelper.isEmptyOrSpaces(paramId)) {
          // Create
          //this.setFormGroup();
        } else {
          // Update
          this.bookId = +paramId;
          this.loadData();
        }
      }
    });
  }
  
  public loadData()
  {
    //this.repositorySvc.getBook<Book>(this.bookId).subscribe(res => {
    //  console.log('RES: ', res);
    //  this.book = res;
    //  this.setFormGroup(res);
    //}, error => {
    //  console.log(error);
    //});
  }

  //riaggiungi l'undefined
  setFormGroup(item: Book) {
    this.formGroup = this.fb.group({
      titleBook: [{ value: item?.title, disabled: false }, [Validators.required]],
      author: [{ value: item?.author, disabled: false }, [Validators.required]],
      price: [{ value: item?.price, disabled: false }, [Validators.required]],
      genre: [{ value: item?.genre, disabled: false }, [Validators.required]],
      publish_Year: [{ value: item?.publish_Year, disabled: false }, [Validators.required]],
      publisher: [{ value: item?.publisher, disabled: false }, [Validators.required]],
      description: [{ value: item?.description, disabled: false }],
    });
  }

  save(e: any) {
    //if (this.formGroup.invalid) {
    //  //const errors = this.commonHelper.showErrors(
    //  //  this.formGroup, ['error.required'],
    //  //  'machine',
    //  //  (label) => {
    //  //    return this.resourceSvc.getLabel(label);
    //  //  });
    //  e.forEach((message: string) => this.toastSvc.openToast(ToastType.Warning, message));
    //  return;
  }
  
    //if (this.book == null) {
    //  this.repositorySvc.createBook<FormData>(formData).subscribe(res => {
    //  }, error => {
    //    console.log(error);
    //  });
    //} else {
    //  this.repositorySvc.updateBook<FormData>(this.book.id, formData).subscribe(res => {
    //  }, error => {
    //    console.log(error);
    //  });
    //}

    //this.router.navigate(['/books']);
  
}
