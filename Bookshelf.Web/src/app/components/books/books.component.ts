import { Component } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { Book } from '../../classes/book';
import { BookList } from '../../classes/book-list';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';
import { GridColumn, GridConstantsConfig } from '../../interfaces/gridColumn.interface';
import { Context } from '@progress/kendo-angular-grid/filtering/filter-host.directive';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  public currentContext: BooksComponent;
  public columns: GridColumn[] = [];
  public gridData: Book[];
  public originalData: Book[] | undefined;
  public constantsListener: Observable<GridConstantsConfig> | undefined;
  public searchText: string | undefined;

  //public actions: BaseButtonAction[] = [];

  constructor(
    private router: Router,
    private repositorySvc: RepositoryService,
  ) {

    //this.currentContext = this;

    this.gridData = [];

    this.reloadData();
  }

  // Get the list of books
  private reloadData() {
    this.repositorySvc.getBookList<BookList>().subscribe(
      result => {
        this.originalData = result.list;
        this.gridData = result.list;
        console.log("LIST", result.list)
      },
      error => {
        console.error(error)
      }
    );
  }

  // Create a new book -> in managebook component


  // Update a book -> in bookdetail component





  // Delete a single book from the list
  public delete(book: Book) { 
    this.repositorySvc.deleteBook(book.id, Book).subscribe(
      () => {
        this.reloadData();
      },

      (error) => {
        console.error(error)
      }
    );

    this.router.navigate(['/books']);
  }

  onChangeSearchText(newValue: string | undefined) {
    this.searchText = newValue;
    this.refreshSearchFilter();
  }


  public refreshSearchFilter() {
    this.gridData = this.originalData.filter(
      (request: Book) =>
        (request.genre != null && request.genre.toString().toUpperCase().includes(this.searchText.toUpperCase()))
        || (request.title != null && request.title.toUpperCase().includes(this.searchText.toUpperCase()))
        || (request.author != null && request.author.toUpperCase().includes(this.searchText.toUpperCase()))
        || (request.price != null && request.price.toString().includes(this.searchText.toUpperCase()))
        || (request.publish_Year != null && request.publish_Year.toString().includes(this.searchText.toUpperCase()))
        || (request.publisher != null && request.publisher.toUpperCase().includes(this.searchText.toUpperCase()))
        || (request.description != null && request.description.toUpperCase().includes(this.searchText.toUpperCase()))
      );
  }

  public viewEditButtonClick(data: Book, currentContext: BooksComponent) {
    currentContext.router.navigate(['/bookdetail/' + data.id]);
  }

}
