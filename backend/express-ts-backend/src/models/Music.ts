import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Tag from './Tag';

class Music extends Model {
  public id!: number;
  public name!: string;
  public author!: string;
  public pdfPath!: string;
  public tags?: Tag[];
}

Music.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdfPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Music',
  }
);

Music.belongsToMany(Tag, { through: 'MusicTag' });
Tag.belongsToMany(Music, { through: 'MusicTag' });

export default Music;