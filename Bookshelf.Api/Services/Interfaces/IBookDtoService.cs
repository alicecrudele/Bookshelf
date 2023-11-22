using Bookshelf.Api.Domain.Dto;
using Bookshelf.Api.Services.Interfaces;

namespace Bookshelf.Web.Services.Interfaces
{
    public interface IBookDtoService : IApplicationService
    {
        BookListDto GetBookList();
        BookListDto GetBookGenreList();
        BookDto GetBook(long id);
        void CreateBook(BookDto dto);
        void UpdateBook(long id);
        void DeleteBook(long id);
        
    }
}