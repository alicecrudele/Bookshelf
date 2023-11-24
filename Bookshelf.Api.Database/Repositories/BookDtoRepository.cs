using Dapper;
using Bookshelf.Api.Domain.Configurations;
using Bookshelf.Api.Domain.Dto;
using Bookshelf.Api.Domain.Helpers;
using Bookshelf.Api.Database.Constants;
using Bookshelf.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bookshelf.Api.Database.Mappers;
using Bookshelf.Api.Domain.Entities;
using System.Diagnostics;

namespace Bookshelf.Api.Database.Repositories
{
    public class BookDtoRepository : Repository<BookDto>
    {

        private readonly SqlConnectionFactory sqlConnectionFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="BookDtoRepository"/> class.
        /// </summary>
        /// <param name="connectionConfig">The connection configuration.</param>
        public BookDtoRepository(ConnectionConfig connectionConfig)
            : base(connectionConfig, DatabaseConst.DEFAULT_CONNECTION_NAME)
        {
            sqlConnectionFactory = new SqlConnectionFactory(connectionConfig[0]);
        }

        public BookListDto GetBookList()
        {
            string query;
            BookListDto result = new BookListDto();
            using (IDbConnection connection = sqlConnectionFactory.CreateConnection())
            {
                query = ResourceHelper.GetResourceAsText($"{DatabaseConst.RESOURCE_BASE_PATH}{DatabaseConst.BASE_PATH_BOOK}{DatabaseConst.BOOK_LIST_DTO_SELECT}");
                result.List = connection.Query<BookDto>(query).ToList();

                connection.Close();
            }
            return result;
        }

        public BookListDto GetBookGenreList()
        {
            string query;
            BookListDto result = new BookListDto();
            using (IDbConnection connection = sqlConnectionFactory.CreateConnection())
            {
                query = ResourceHelper.GetResourceAsText($"{DatabaseConst.RESOURCE_BASE_PATH}{DatabaseConst.BASE_PATH_BOOK}{DatabaseConst.BOOK_LIST_DTO_SELECT_BY_GENRE}");
                result.List = connection.Query<BookDto>(query).ToList();

                connection.Close();
            }
            return result;
        }

        public BookDto GetBook(long id)
        {
            string query;
            Book result = new Book();
            using (IDbConnection connection = sqlConnectionFactory.CreateConnection())
            {
                query = ResourceHelper.GetResourceAsText($"{DatabaseConst.RESOURCE_BASE_PATH}{DatabaseConst.BASE_PATH_BOOK}{DatabaseConst.BOOK_DTO_SELECT_BY_ID}");
                result = connection.Query<Book>(query, param: new { Id = id }).FirstOrDefault();
                
                connection.Close();
            }
            return BookDtoMapper.EntityToDto(result);
        }

        public long CreateBook(BookDto dto)
        {
            long res;
            using (IDbConnection connection = sqlConnectionFactory.CreateConnection())
            {
                using (var tran = connection.BeginTransaction())
                {
                    long? insertedId;
                    var query = ResourceHelper.GetResourceAsText($"{DatabaseConst.RESOURCE_BASE_PATH}{DatabaseConst.BASE_PATH_BOOK}{DatabaseConst.BOOK_DTO_INSERT}");
                    insertedId = connection.QuerySingle<long>(query, param: dto, transaction: tran);
                    //param: dto sostituisce il seguente codice, utilizzarlo solo se i parametri sono uguali a quelli del dto, altrimenti usare come sotto
                    //{ 
                    //    Title = dto.Title, 
                    //    Author = dto.Author, 
                    //    Price = dto.Price, 
                    //    Genre = dto.Genre, 
                    //    Publish_year = dto.Publish_Year,
                    //    Publisher = dto.Publisher,
                    //    Description = dto.Description
                    //},
                    //
                    
                    tran.Commit();

                    res = insertedId.Value;
                }

                connection.Close();
            }

            return res;
        }

        public void UpdateBook(long id, BookDto dto)
        {
            using (IDbConnection connection = sqlConnectionFactory.CreateConnection())
            {
                using (var tran = connection.BeginTransaction())
                {
                    
                    var query = ResourceHelper.GetResourceAsText($"{DatabaseConst.RESOURCE_BASE_PATH}{DatabaseConst.BASE_PATH_BOOK}{DatabaseConst.BOOK_DTO_UPDATE_BY_ID}");
                    dto.Id = ((int)id);
                    connection.Execute(query, param: dto, transaction: tran);


                    tran.Commit();
                }
                connection.Close();
            }

        }

        public void DeleteBook(long id)
        {
            using (IDbConnection connection = sqlConnectionFactory.CreateConnection())
            {
                using (var tran = connection.BeginTransaction())
                {

                    var query = ResourceHelper.GetResourceAsText($"{DatabaseConst.RESOURCE_BASE_PATH}{DatabaseConst.BASE_PATH_BOOK}{DatabaseConst.BOOK_DTO_DELETE_BY_ID}");
                    connection.Execute(query, param: new { Id = id });
                    tran.Commit();
                    
                }
                connection.Close();
            }

        }
    }
}
