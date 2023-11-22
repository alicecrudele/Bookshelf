using Bookshelf.Api.Domain.Dto;
using Bookshelf.Api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bookshelf.Api.Database.Mappers
{
    public class BookDtoMapper
    {

        public static BookDto EntityToDto(Book book)
        {
            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Price = book.Price,
                Genre = book.Genre,
                Publish_Year = book.Publish_Year,
                Publisher = book.Publisher,
                Description = book.Description,
                Image_Attachment = book.Image_Attachment
            };
        }


    }
}
