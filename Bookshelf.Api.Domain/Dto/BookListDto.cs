using System;
using System.Collections.Generic;
using System.Text;

namespace Bookshelf.Api.Domain.Dto
{
    public class BookListDto
    {
        public BookListDto()
        {
            List = new List<BookDto>();
        }

        public IList<BookDto> List { get; set; }
    }
}
