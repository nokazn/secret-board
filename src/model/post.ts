import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/secret_board',
  'postgres',
  'postgres',
  {
    logging: false,
    // host: 'localhost',
    // operatorsAliases: false,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
    },
  },
);

const init = async () => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      postedBy: {
        type: DataTypes.STRING,
      },
      trackingCookie: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    },
  );

  await Post.sync().catch((err) => {
    console.error({ err });
  });
  return Post;
};
export default init();
