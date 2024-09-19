const User = require('../models/User');

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role'); // Selects name, email, and role fields
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

module.exports = { getAllUsers };
