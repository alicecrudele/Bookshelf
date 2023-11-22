import { Component } from '@angular/core';
import { Book } from '../../classes/book';
import { BookList } from '../../classes/book-list';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';
import { ConstantHelper } from '../../helpers/constant.helper';
import { RepositoryService } from '../../services/repository.service';
import { GenresComponent } from '../genres/genres.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
   
  }

  public selectFirstPage() {
    //this.grid.resetPager();
  }


}
