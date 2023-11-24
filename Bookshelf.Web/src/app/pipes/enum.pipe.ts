import { Pipe, PipeTransform } from "@angular/core";

//import { GenreType } from "../../../../Bookshelf.Api.Domain/Entities";

export enum GenreType {
  //fiction = 'fiction',
  //mystery = 'mystery',
  //thriller = 'thriller',
  //horror = 'horror',
  //historical = 'historical',
  //romance = 'romance',
  //western = 'western',
  //science_fiction = 'science fiction',
  //fantasy = 'fantasy',
  //poetry = 'poetry',
}


@Pipe({
  name: 'enumToDescription',
})

export class EnumToDescriptionPipe implements PipeTransform {
  transform(value: GenreType): string {
    return GenreType[value];
  }
}
