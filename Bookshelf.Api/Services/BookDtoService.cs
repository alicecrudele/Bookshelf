using Bookshelf.Api.Domain.Configurations;
using Bookshelf.Api.Domain.Dto;
using Bookshelf.Web.Services.Interfaces;
using Bookshelf.Api.Database.Repositories;
using Microsoft.Extensions.Options;
using System.Transactions;
using Microsoft.Extensions.Logging;
using System;
using System.IO;

namespace Bookshelf.Web.Services
{
    public class BookDtoService : IBookDtoService
    {
        private readonly ServerConfig _serverConfiguration;
        private readonly ServerConfig _serverConfigurationLegacy;

        private readonly ILogger _logger;
        private readonly ConnectionConfig _connectionConfig;
        private string _path;
       
        public BookDtoService(IOptions<ServerConfig> serverIConfigOptions,
            ILogger<BookDtoService> logger,
            IOptions<ServerConfig> serverIConfigOptionsLegacy,
            IOptions<ConnectionConfig> connectionConfigOptions,
            IOptions<AttachmentsConfig> options
            )
        {
            _serverConfiguration = serverIConfigOptions.Value;
            _serverConfigurationLegacy = serverIConfigOptionsLegacy.Value;

            _path = options.Value.PATH;

            
            _connectionConfig = connectionConfigOptions.Value;

            try
            {
                var location = Environment.GetCommandLineArgs()[0];
                var appName = Path.GetFileName(location);
                appName = appName.Substring(0, appName.IndexOf("."));

                _serverConfigurationLegacy.FilesystemRoot = string.Format("{0}\\{1}", Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), appName);
                _serverConfigurationLegacy.FilesystemTmp = string.Format("{0}\\{1}\\{2}", Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), appName, "tmp");

                if (string.IsNullOrEmpty(_path))
                {
                    _serverConfiguration.FilesystemRoot = _serverConfigurationLegacy.FilesystemRoot;
                    _serverConfiguration.FilesystemTmp = _serverConfigurationLegacy.FilesystemTmp;
                }
                else
                {
                    _serverConfiguration.FilesystemRoot = string.Format("{0}\\{1}", _path, appName);
                    _serverConfiguration.FilesystemTmp = string.Format("{0}\\{1}\\{2}", _path, appName, "tmp");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                throw;
            }
        }

        public void Dispose()
        {
        }
        
        
        public BookListDto GetBookList()
        {
            try
            {
                var bookRepo = new BookDtoRepository(_connectionConfig);
                return bookRepo.GetBookList();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public BookListDto GetBookGenreList()
        {
            try
            {
                var bookRepo = new BookDtoRepository(_connectionConfig);
                return bookRepo.GetBookGenreList();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public BookDto GetBook(long id)
        {
            try
            {
                BookDto dto = null;

                var bookRepo = new BookDtoRepository(_connectionConfig);
                dto = bookRepo.GetBook(id);
               
                return dto;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public void CreateBook(BookDto dto)
        {
            try
            {
                using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    var bookRepo = new BookDtoRepository(_connectionConfig);
                    bookRepo.CreateBook(dto);
                    
                    scope.Complete();
                    return;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public void UpdateBook(long id, BookDto dto)
        {
            try
            {
                using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    var bookRepo = new BookDtoRepository(_connectionConfig);
                    bookRepo.UpdateBook(id, dto);

                    scope.Complete();
                    return;
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public void DeleteBook(long id)
        {
            try
            {
                using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    var bookRepo = new BookDtoRepository(_connectionConfig);
                    bookRepo.DeleteBook(id);

                    scope.Complete();
                    return;
                }

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}