import { Pipe, PipeTransform } from "@angular/core";
import { Genre } from "../classes/book";

@Pipe({
  name: 'enumToDescription',
})

export class EnumToDescriptionPipe implements PipeTransform {
  transform(value: Genre): string {
    return Genre[value];
  }
}
