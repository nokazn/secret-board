import { Sequelize } from 'sequelize';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } from '../constants';

const initDb = () => {
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
