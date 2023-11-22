import { Component } from '@angular/core';
import { GridColumn, GridConstantsConfig } from '../../interfaces/gridColumn.interface';
import { Book } from '../../classes/book';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service';
import { BookList } from '../../classes/book-list';


@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {
  public columns: GridColumn[] = [];
  public gridData: Book[];
  public originalData: Book[] | undefined;
  public constantsListener: Observable<GridConstantsConfig> | undefined;

  constructor(
    private router: Router,
    private repositorySvc: RepositoryService,
    private commonSvc: CommonService
  ) {

    this.gridData = [];

    this.reloadData();
  }

  private reloadData() {
    this.repositorySvc.getBookList<BookList>().subscribe(
      (result) => {
        this.originalData = result.list;
        this.gridData = result.list;
        console.log("LIST", result.list)
      },
      (error) => {
        console.error(error)
      }
    );
  }
}
