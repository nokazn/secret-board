import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { db } from '../infrastructure/db';

interface PostAttributes {
  id: number;
  content: string;
  postedBy: string;
  trackingCookie: string | null;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

const init = async () => {
  const Post: ModelDefined<PostAttributes, PostCreationAttributes> = db.define(
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
        allowNull: true,
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
