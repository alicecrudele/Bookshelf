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

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private repositorySvc: RepositoryService,
    private commonHelper: CommonHelper,
    private toastSvc: ToastService
  ) {
    this.setFormGroup();

  }


  //riaggiungi l'undefined
  setFormGroup(item: User = undefined) {
    this.formGroup = this.fb.group({
      username: [{ value: item?.username, disabled: false }, [Validators.required, Validators.email]],
      password: [{ value: item?.password, disabled: false }, [Validators.required]],
    });
  }

  login() {
    if (this.formGroup.value.username == "alice@alice.it" || this.formGroup.value.password == "alice") {
      this.router.navigate(['/books']);
    } else {
      this.toastSvc.openToast(ToastType.Error, "Username o password errati")
    }

  }

}
