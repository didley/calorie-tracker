import chalk from "chalk";

const environment = process.env.NODE_ENV;

if (!environment) {
  throw new Error(
    "NODE_ENV not set, add NODE_ENV to start of package.json script or set in .env. eg. NODE_ENV=development"
  );
}

let dbURI;

if (environment === "development") {
  dbURI = process.env.DB_DEV_URI;
  console.log(chalk.white.bgCyan.bold("  DEV ENVIRONMENT  "));
}

if (environment === "test") {
  dbURI = process.env.DB_TEST_URI;
  console.log(chalk.white.bgYellow.bold("  TEST ENVIRONMENT  "));
}

if (environment === "production") {
  dbURI = process.env.DB_PROD_URI;
  console.log(chalk.white.bgRed.bold("  PRODUCTION ENVIRONMENT!  "));
}

export { dbURI, environment };
