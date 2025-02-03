import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Tag extends Model {
  public id!: number;
  public name!: string;
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure tag names are unique
    },
  },
  {
    sequelize,
    modelName: 'Tag',
  }
);

export default Tag;