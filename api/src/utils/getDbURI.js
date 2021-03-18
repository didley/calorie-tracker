import chalk from "chalk";

if (!process.env.NODE_ENV) {
  throw new Error(
    "NODE_ENV not set, add NODE_ENV to start of package.json script or set in .env. eg. NODE_ENV=development"
  );
}

let dbURI;

if (process.env.NODE_ENV === "development") dbURI = process.env.DB_DEV_URI;

if (process.env.NODE_ENV === "test") dbURI = process.env.DB_TEST_URI;

if (process.env.NODE_ENV === "production") {
  dbURI = process.env.DB_PROD_URI;
  console.log(chalk.bgRed.white.bold("  IN PRODUCTION ENVIRONMENT!  "));
}

export { dbURI };
