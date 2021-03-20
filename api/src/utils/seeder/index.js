import shell from "shelljs";

import { dbURI } from "../getDbURI";
const dbName = "calorie-tracker";

const config = {
  db: {
    URI: dbURI,
    name: dbName,
  },
  collections: [
    { name: "foods", file: "src/utils/seeder/foods.seed.json" },
    { name: "users", file: "src/utils/seeder/users.seed.json" },
  ],
};

// // food seed only without drop config
// const config = {
//   db: {
//     URI: dbURI,
//     name: dbName,
//   },
//   collections: [
//     { name: "foods", file: "src/utils/seeder/foods.seed.json", drop: false },
//   ],
// };

async function seed(config) {
  const { db, collections } = config;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Seed is being attempted on production database, seeding should only be completed in development environment."
    );
  }

  function mongoImport(dbURI, dbName, collection, drop = true, file) {
    shell.exec(
      `mongoimport --jsonArray --uri ${dbURI} --db ${dbName} --collection ${collection} ${
        drop ? "--drop" : ""
      } --file ${file}`
    );
  }

  collections.map((collection) => {
    mongoImport(
      db.URI,
      db.name,
      collection.name,
      collection?.drop,
      collection.file
    );
  });
}

seed(config);
