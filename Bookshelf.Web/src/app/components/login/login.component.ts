import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonHelper } from '../../helpers/common.helper';
import { User } from '../../classes/user';
import { ToastService } from '../../services/toast.service';
import { ToastType } from '../../classes/toastMessage';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  formGroup: FormGroup | undefined;

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
          //this.setFormGroup();
        } else {
          
        }
      }
    });

  }


  //riaggiungi l'undefined
  setFormGroup(item: User) {
    this.formGroup = this.fb.group({
      username: [{ value: item?.username, disabled: false }, [Validators.required, Validators.email]],
      password: [{ value: item?.password, disabled: false }, [Validators.required]],
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }


  save() {
    this.router.navigate(['/books']);

    //chiama il login
  }


  login() {

    //if () { }
    //else { }

    /*
        quello scritto nell' input username alice@alice.it e nella password alice allora mostri anche le altre pagine
        
        altrimenti mostri un toast di errore e non mostri le altre pagine
    */

  }

}
