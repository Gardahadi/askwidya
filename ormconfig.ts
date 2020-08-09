import "dotenv/config";

export = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "askwidya",
  synchronize: true,
  logging: ["error"],
  entities: ["src/entities/*.ts", "dist/entities/*.js"],
};
