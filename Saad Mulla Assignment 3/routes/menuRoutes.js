const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const verifyToken = require('../middleware/auth');

router.put('/:id', verifyToken, menuController.updateMenuItem);
router.delete('/:id', verifyToken, menuController.deleteMenuItem);

module.exports = router;
