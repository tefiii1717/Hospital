module.exports = {
  development: {
    username: "postgres",
    password: process.env.DB_PASSWORD || "1234",
    database: "hospital_db",
    host: process.env.DB_HOST || "127.0.0.1",  // ← cambia a esto
    dialect: "postgres"
  }
};