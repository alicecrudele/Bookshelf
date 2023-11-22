
namespace Bookshelf.Api.Database.Constants
{

    /// <summary>
    /// 
    /// </summary>
    static class DatabaseConst
    {
		public const string DEFAULT_LANGUAGE = "en-US";

        public const string DEFAULT_CONNECTION_NAME = "BUSINESS";

        public const string RESOURCE_BASE_PATH = "Bookshelf.Api.Database.Resources.";
        
        //BOOK
        public const string BASE_PATH_BOOK = "Book.";
        public const string BOOK_LIST_DTO_SELECT = "BookListDto_SELECT.sql";
        public const string BOOK_DTO_SELECT_BY_ID = "BookDto_SELECT_BY_ID.sql";
        public const string BOOK_DTO_INSERT = "BookDto_INSERT.sql";
        public const string BOOK_DTO_UPDATE_BY_ID = "BookDto_UPDATE_BY_ID.sql";
        public const string BOOK_DTO_DELETE_BY_ID = "BookDto_DELETE_BY_ID.sql";
        public const string BOOK_LIST_DTO_SELECT_BY_GENRE = "BookListDto_SELECT_BY_GENRE.sql";      
    }

}
