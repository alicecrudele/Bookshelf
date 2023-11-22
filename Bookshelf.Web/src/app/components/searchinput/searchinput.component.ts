import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'search-input',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.scss']
})
export class SearchinputComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) private searchInput: ElementRef | undefined;

  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    //fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
    //  map((event: any) => event.target.value),
    //  filter((res: string) => res.length > 2 || res.length === 0),
    //  debounceTime(500),
    //  distinctUntilChanged()
    //).subscribe((text: string) => {
    //  this.onSearch.emit(text);
    //});
  }

  public setValue(text: string) {
  //this.searchInput.nativeElement.value = text;
  }
}
