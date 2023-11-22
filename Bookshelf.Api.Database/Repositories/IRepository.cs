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
    public interface IRepository
    {

        /// <summary>
        /// Gets the connection configuration.
        /// </summary>
        /// <value>
        /// The connection configuration.
        /// </value>
        ConnectionConfig ConnectionConfig { get; }

    }
}
