const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body.username, req.body.password);
        await user.save();
        res.status(201).send({ message: 'Usuario creado satisfactoriamente' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByUsername(req.body.username);
        if (!user) return res.status(404).send('User not found');

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ username: user.username }, 'secreto');
        res.status(200).send({
            message: 'Sesión iniciada correctamente',
            token: token
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.status(200).send({ message: 'Sesión cerrada correctamente' });
});

module.exports = router;
