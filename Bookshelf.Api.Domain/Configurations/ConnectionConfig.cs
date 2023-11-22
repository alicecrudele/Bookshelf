using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookshelf.Api.Domain.Configurations
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="System.Collections.Generic.List{Bookshelf.Api.Domain.Configurations.ConnectionStringConfig}" />
    public class ConnectionConfig : List<ConnectionStringConfig>
    {
        /// <summary>
        /// Gets the <see cref="ConnectionStringConfig"/> with the specified name.
        /// </summary>
        /// <value>
        /// The <see cref="ConnectionStringConfig"/>.
        /// </value>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        public ConnectionStringConfig this[string name]
        {
            get
            {
                return this.FirstOrDefault(x => string.Equals(x.Name, name, StringComparison.InvariantCulture));
            }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ConnectionConfig"/> class.
        /// </summary>
        public ConnectionConfig()
        {
        }
    }

}
