import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const initDb = () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
  const uri = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  const sequelize = new Sequelize(uri, {
    logging: false,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
    },
  });

  return sequelize;
};

export const db = initDb();
