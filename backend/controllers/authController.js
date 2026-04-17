const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const registerUser = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database connection is currently unavailable. Please start MongoDB.' });
    }

    const { name, email, password, role, phone, aadhaar, upiId } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      aadhaar,
      upiId
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database connection is currently unavailable. Please start MongoDB.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findFreelancer = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database disconnected' });
    }
    const { email } = req.params;
    const user = await User.findOne({ email, role: 'freelancer' }).select('name email');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'No freelancer found with this email' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findClient = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database disconnected' });
    }
    const { email } = req.params;
    const user = await User.findOne({ email, role: 'client' }).select('name email');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'No client found with this email' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, findFreelancer, findClient };
