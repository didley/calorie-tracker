import chalk from "chalk";

const environment = process.env.NODE_ENV;
let dbURI = process.env.DB_DEV_URI;

if (!environment) {
  throw new Error(
    "NODE_ENV not set, add NODE_ENV to start of package.json script or set in .env. eg. NODE_ENV=development"
  );
}

if (environment === "development")
  console.log(chalk.white.bgCyan.bold("  DEV ENVIRONMENT  "));

if (environment === "test")
  console.log(chalk.white.bgYellow.bold("  TEST ENVIRONMENT  "));

if (environment === "production")
  console.log(chalk.white.bgRed.bold("  PRODUCTION ENVIRONMENT!  "));

export { dbURI, environment };
