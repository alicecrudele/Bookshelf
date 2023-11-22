using Bookshelf.Api.Domain.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookshelf.Api.Database.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="M"></typeparam>
    /// <seealso cref="PlantDataSurvey.Database.Repositories.IRepository" />
    public abstract class Repository<M> : IRepository
      where M : class, new()
    {
        private readonly ConnectionConfig _connectionConfig;
        private readonly string _defaultConnectionName;

        /// <summary>
        /// Gets the default connection string configuration.
        /// </summary>
        /// <value>
        /// The default connection string configuration.
        /// </value>
        protected ConnectionStringConfig DefaultConnectionStringConfig
        {
            get
            {
                return _connectionConfig.FirstOrDefault(x => x.Name == _defaultConnectionName);
            }
        }

        /// <summary>
        /// Gets the connection configuration.
        /// </summary>
        /// <value>
        /// The connection configuration.
        /// </value>


        /// <summary>
        /// Initializes a new instance of the <see cref="Repository{M}"/> class.
        /// </summary>
        /// <param name="connectionConfig">The connection configuration.</param>
        /// <param name="defaultConnectionName">Default name of the connection.</param>
        public Repository(ConnectionConfig connectionConfig, string defaultConnectionName)
        {
            _connectionConfig = connectionConfig;
            _defaultConnectionName = defaultConnectionName;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Repository{M}"/> class.
        /// </summary>
        /// <param name="connectionConfig">The connection configuration.</param>
        public Repository(ConnectionConfig connectionConfig)
        {
            _connectionConfig = connectionConfig;
            _defaultConnectionName = null;
        }

        /// <summary>
        /// Gets the connection configuration.
        /// </summary>
        /// <value>
        /// The connection configuration.
        /// </value>
        public ConnectionConfig ConnectionConfig
        {
            get
            {
                return _connectionConfig;
            }
        }
    }
}
