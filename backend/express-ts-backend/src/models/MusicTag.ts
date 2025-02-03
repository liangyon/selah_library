import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class MusicTag extends Model {
  public musicId!: number;
  public tagId!: number;
}

MusicTag.init(
  {
    musicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tagId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'MusicTag',
  }
);

export default MusicTag;