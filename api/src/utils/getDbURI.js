import chalk from "chalk";

if (!process.env.NODE_ENV) {
  throw new Error(
    "NODE_ENV not set, add NODE_ENV to start of package.json script or set in .env. eg. NODE_ENV=development"
  );
}

let dbURI;

if (process.env.NODE_ENV === "development") {
  dbURI = process.env.DB_DEV_URI;
  console.log(chalk.white.bgCyan.bold("  DEV ENVIRONMENT  "));
}

if (process.env.NODE_ENV === "test") {
  dbURI = process.env.DB_TEST_URI;
  console.log(chalk.white.bgYellow.bold("  TEST ENVIRONMENT  "));
}

if (process.env.NODE_ENV === "production") {
  dbURI = process.env.DB_PROD_URI;
  console.log(chalk.white.bgRed.bold("  PRODUCTION ENVIRONMENT!  "));
}

export { dbURI };
