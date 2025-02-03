const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// Initialize Sequelize
const sequelize = new Sequelize('selah', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users', // Ensure this matches your table name
  timestamps: true, // Enable createdAt and updatedAt
});

// Function to create a user
const createUser = async (username, password) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    console.log('User created successfully:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the function
createUser('testuser', 'testpassword');