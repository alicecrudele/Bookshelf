import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../classes/book';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { RepositoryService } from '../../services/repository.service';
import { CommonHelper } from '../../helpers/common.helper';
import { ToastType } from '../../classes/toastMessage';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'managebook',
  templateUrl: './managebook.component.html',
  styleUrls: ['./managebook.component.scss']
})
export class ManagebookComponent {

  public show: boolean = false;
  public buttonName: any = 'Show';

  formGroup: FormGroup ;
  public book: Book ;
  private bookId: number;
  resourceSvc: any;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private repositorySvc: RepositoryService,
    private commonHelper: CommonHelper,
    private toastSvc: ToastService
  ) {
    this.route.params.subscribe(params => {
      if (params) {
        const paramid = params['id'];

        if (this.commonHelper.isEmptyOrSpaces(paramid)) {
          // create
          this.setFormGroup();
        } else {
          // update
          this.bookId = +paramid;
          this.loadData();
        }
      }
    });

  }

  private loadData() {
    this.repositorySvc.getBook<Book>(this.bookId).subscribe(res => {
      this.book = res;
      this.setFormGroup(res);
    }, error => {
      console.log(error);
    });
  }



  setFormGroup(item: Book = undefined) {
    this.formGroup = this.fb.group({
      id: [{ value: item?.id, disabled: false }],
      title: [{ value: item?.title, disabled: false }, [Validators.required]],
      author: [{ value: item?.author, disabled: false }, [Validators.required]],
      price: [{ value: item?.price, disabled: false }, [Validators.required]],
      genre: [{ value: item?.genre, disabled: false }, [Validators.required]],
      publish_Year: [{ value: item?.publish_Year, disabled: false }, [Validators.required]],
      publisher: [{ value: item?.publisher, disabled: false }, [Validators.required]],
      description: [{ value: item?.description, disabled: false }, [Validators.required]],
    });
  }

  save(e: any) {
      if (this.formGroup.invalid) {
        //const errors = this.commonHelper.showErrors(
        //  this.formGroup, ['error.required'],
        //  'book',

          //modificare e togliere la label
          //(label) => {
          //  return this.resourceSvc.getlabel(label);

          //});
        //errors.forEach(message => this.toastSvc.openToast(ToastType.Warning, message));
        //return;

      }

    this.repositorySvc.createBook<Book>(this.formGroup.value).subscribe(res => {
        this.router.navigate(['/books']);
      }, error => {
        console.log(error);
      });

  }
}
