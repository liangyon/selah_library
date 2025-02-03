import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('selah', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Disable logging SQL queries (optional)
});

export default sequelize;