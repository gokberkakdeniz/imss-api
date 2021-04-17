import { Options } from "@mikro-orm/core";
import { Logger } from "@nestjs/common";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
const logger = new Logger("MikroORM");

const config: Options = {
  type: "mariadb",
  host: process.env.IMSS_DB_HOST,
  dbName: process.env.IMSS_DB_DATABASE,
  port: Number(process.env.IMSS_DB_PORT),
  user: process.env.IMSS_DB_USERNAME,
  password: process.env.IMSS_DB_PASSWORD,
  logger: logger.log.bind(logger),
  entities: ["dist/models/**/*.entity.js"],
  entitiesTs: ["src/models/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
};

export default config;
