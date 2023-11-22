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

    /// <summary>
    ///     Chiamata per ottenere la lista dei libri
    /// </summary>
    [HttpGet("[action]")]
    public BookListDto GetBookList()
    {
        return _bookDtoService.GetBookList();
    }

    /// <summary>
    ///     Chiamata per ottenere la lista dei libri in base al genere
    /// </summary>
    [HttpGet("[action]")]
    public BookListDto GetBookGenreList()
    {
        return _bookDtoService.GetBookGenreList();
    }

    /// <summary>
    ///     Chiamata per ottenere il dettaglio del libro
    /// </summary>
    [HttpGet("[action]/{id}")]
    public BookDto GetBook([FromRoute] long id)
    {
        return _bookDtoService.GetBook(id);
    }

    /// <summary>
    ///     Creazione-aggiunta di un nuovo libro
    /// </summary>
    [HttpPost("[action]")]
    public void CreateBook([FromBody] BookDto dto)
    {
        _bookDtoService.CreateBook(dto);
    }

    /// <summary>
    ///    Modifica di un libro
    /// </summary>
    [HttpPut("[action]/{id}")]
    public void UpdateBook([FromRoute] long id)
    {
        _bookDtoService.UpdateBook(id);
    }

    /// <summary>
    ///    Eliminazione di un libro
    /// </summary>
    [HttpDelete("[action]/{id}")]
    public void DeleteBook([FromRoute] long id)
    {
        _bookDtoService.DeleteBook(id);
    }

}