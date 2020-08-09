import "dotenv/config";

export = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: ["Error"],
  entities: ["src/entities/*.ts", "dist/entities/*.js"],
};
