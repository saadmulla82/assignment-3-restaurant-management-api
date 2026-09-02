const Restaurant = require('../models/Restaurant');

exports.getAllRestaurants = async (request, response) => {
    try {
        const restaurants = await Restaurant.find();
        response.status(200).json(restaurants);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.getTopRestaurants = async (request, response) => {
    try {
        const restaurants = await Restaurant.find().sort({ rating: -1 }).limit(5);
        response.status(200).json(restaurants);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.getRestaurantById = async (request, response) => {
    try {
        const restaurant = await Restaurant.findById(request.params.id);
        if (!restaurant) {
            return response.status(404).json({ message: 'Restaurant not found' });
        }
        response.status(200).json(restaurant);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.createRestaurant = async (request, response) => {
    try {
        const { name, city, address, cuisine, rating } = request.body;

        if (!name || !city || !address || !cuisine || !rating) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        const newRestaurant = new Restaurant({ name, city, address, cuisine, rating });
        await newRestaurant.save();

        response.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.updateRestaurant = async (request, response) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!restaurant) {
            return response.status(404).json({ message: 'Restaurant not found' });
        }
        response.status(200).json({ message: 'Restaurant updated successfully', restaurant });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.deleteRestaurant = async (request, response) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(request.params.id);
        if (!restaurant) {
            return response.status(404).json({ message: 'Restaurant not found' });
        }
        response.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
