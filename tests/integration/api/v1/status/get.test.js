test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log("updated_at: " + responseBody.updated_at);
  console.log("db_version: " + responseBody.dependencies.database.version);
  console.log(
    "max_connections: " + responseBody.dependencies.database.max_connections,
  );
  console.log(
    "current_connections: " +
      responseBody.dependencies.database.current_connections,
  );

  expect(responseBody.dependencies.database.version).toBe("16.0");
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.current_connections).toBe(1);

  // expect(responseBody.dependencies.database_version).toBeDefined();
  // expect(responseBody.dependencies.max_connections).toBeDefined();
  // expect(responseBody.dependencies.current_connections).toBeDefined();
  // expect(responseBody.dependencies.max_connections).toBeGreaterThan(0);
  // expect(
  //   responseBody.database.dependencies.current_connections,
  // ).toBeGreaterThan(0);
});
