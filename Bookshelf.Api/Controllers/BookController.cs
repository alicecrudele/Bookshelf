using Bookshelf.Api.Domain.Dto;
using Bookshelf.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bookshelf.Web.Controllers;

/// <summary>
///     Controller per la gestione dei libri
/// </summary>
/// <seealso cref="Controller" />

[Route("api/[controller]")]
public class BookController : Controller
{
    private IBookDtoService _bookDtoService;

    public BookController(IBookDtoService bookDtoService)
    {
        _bookDtoService = bookDtoService;
    }

    [HttpGet("[action]")]
    public BookListDto GetBookList()
    {
        return _bookDtoService.GetBookList();
    }

    [HttpGet("[action]")]
    public BookListDto GetBookGenreList()
    {
        return _bookDtoService.GetBookGenreList();
    }

    [HttpGet("[action]/{id}")]
    public BookDto GetBook([FromRoute] long id)
    {
        return _bookDtoService.GetBook(id);
    }

    [HttpPost("[action]")]
    public void CreateBook([FromBody] BookDto dto)
    {
        _bookDtoService.CreateBook(dto);
    }

    [HttpPut("[action]/{id}")]
    public void UpdateBook([FromRoute] long id, [FromBody] BookDto dto)
    {
        _bookDtoService.UpdateBook(id, dto);
    }

    [HttpDelete("[action]/{id}")]
    public void DeleteBook([FromRoute] long id)
    {
        _bookDtoService.DeleteBook(id);
    }

}