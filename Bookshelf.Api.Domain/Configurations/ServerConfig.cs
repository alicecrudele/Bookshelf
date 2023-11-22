using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookshelf.Api.Domain.Configurations
{
    public class ServerConfig
    {
        public string FilesystemRoot { get; set; }
        public string FilesystemTmp { get; set; } // temporany folder
    }
}
