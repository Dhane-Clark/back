const bcrypt = require('bcryptjs'); // Use bcryptjs for consistency
const jwt = require('jsonwebtoken');
const user = require('../models/userMod');

const use = {
    userLog: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const foundUser = await user.findOne({ email });
            if (!foundUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, foundUser.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign({ id: foundUser._id, role: foundUser.role }, 'yourSecretKey', {
                expiresIn: '1h',
            });

            res.status(200).json({
                message: 'Login successful',
                token,
                role: foundUser.role,
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    },

    userReg: async (req, res) => {
        try {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new user({ ...req.body, password: hashedPassword });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = use;
