const express = require('express');
const { getAllTasks } = require('../controllers/taskController');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all tasks for admin
router.get('/all', auth, isAdmin, getAllTasks);

module.exports = router;
