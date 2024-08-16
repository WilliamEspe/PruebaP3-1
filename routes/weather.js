const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather', async (req, res) => {
    const city = req.query.city || 'Quito'; // Ciudad por defecto
    const apiKey = '1700e8166c63f9e99afedc4c4bd547cf'; // Reemplaza con tu API Key de OpenWeather
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

