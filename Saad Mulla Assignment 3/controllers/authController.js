const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (request, response) => {
    try {
        const { username, email, password } = request.body;

        if (!username || !email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        response.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.login = async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ message: 'Incorrect email' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        response.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
