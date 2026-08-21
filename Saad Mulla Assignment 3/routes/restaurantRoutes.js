const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const menuController = require('../controllers/menuController');
const verifyToken = require('../middleware/auth');

router.get('/top', restaurantController.getTopRestaurants);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', verifyToken, restaurantController.createRestaurant);
router.put('/:id', verifyToken, restaurantController.updateRestaurant);
router.delete('/:id', verifyToken, restaurantController.deleteRestaurant);

router.get('/:id/menu', menuController.getMenuByRestaurant);
router.post('/:id/menu', verifyToken, menuController.addMenuItem);

module.exports = router;
