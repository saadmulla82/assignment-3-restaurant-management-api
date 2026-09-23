const MenuItem = require('../models/MenuItem');

exports.getMenuByRestaurant = async (request, response) => {
    try {
        const menuItems = await MenuItem.find({ restaurantId: request.params.id });
        response.status(200).json(menuItems);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.addMenuItem = async (request, response) => {
    try {
        const { name, price, isAvailable } = request.body;

        if (!name || !price) {
            return response.status(400).json({ message: 'Name and price are required' });
        }

        const newMenuItem = new MenuItem({
            restaurantId: request.params.id,
            name,
            price,
            isAvailable
        });

        await newMenuItem.save();

        response.status(201).json({ message: 'Menu item added successfully', menuItem: newMenuItem });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.updateMenuItem = async (request, response) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!menuItem) {
            return response.status(404).json({ message: 'Menu item not found' });
        }
        response.status(200).json({ message: 'Menu item updated successfully', menuItem });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.deleteMenuItem = async (request, response) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(request.params.id);
        if (!menuItem) {
            return response.status(404).json({ message: 'Menu item not found' });
        }
        response.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
