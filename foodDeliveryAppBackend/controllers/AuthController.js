// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../modals/user');


// Register a new user
const register = async (req, res) => {

  const {name, email, password } = req.body;

  try {
  
       
  
       const existingUser = await User.findOne({ email });
     
    if (existingUser) {
     
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      passwordHash,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login a user


const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Successfully Login', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};

module.exports = { Login, register };
