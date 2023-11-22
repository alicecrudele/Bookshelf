using Bookshelf.Api.Domain.Enums;

namespace Bookshelf.Api.Domain.Dto
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }
        public GenreType Genre { get; set; }
        public int Publish_Year { get; set; }
        public string Publisher { get; set; }
        public string Description { get; set; }
        public string Image_Attachment { get; set; }
    }
}
