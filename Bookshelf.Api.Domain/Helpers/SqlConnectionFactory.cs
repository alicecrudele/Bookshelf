using Bookshelf.Api.Domain.Configurations;
using System.Data;
using System.Data.SqlClient;

namespace Bookshelf.Api.Domain.Helpers
{
    public class SqlConnectionFactory
    {
        private readonly ConnectionStringConfig _connString;

        public SqlConnectionFactory(ConnectionStringConfig connString)
        {
            _connString = connString;
        }

        public IDbConnection CreateConnection()
        {
            var sqlConnection = new SqlConnection(_connString.ConnectionString);

            if (sqlConnection.State != ConnectionState.Open)
                sqlConnection.Open();

            return sqlConnection;
        }
    }
}
