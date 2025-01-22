import database from "/infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersionQuery = await database.query("SHOW server_version;");
  const dbVersionResult = dbVersionQuery.rows[0].server_version; //query resuls are stored on rows[n] attribute

  const dbMaxConnectionsQuery = await database.query("SHOW max_connections;");
  const dbMaxConnectionsResult = dbMaxConnectionsQuery.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const dbCurrentConnectionsQuery = await database.query({
    text: "SELECT COUNT(*)::int AS used_connections FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });

  const dbCurrentConnectionsResult =
    dbCurrentConnectionsQuery.rows[0].used_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionResult,
        max_connections: parseInt(dbMaxConnectionsResult),
        current_connections: parseInt(dbCurrentConnectionsResult),
      },
    },
  });
}

export default status;
