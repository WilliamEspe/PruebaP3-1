const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/cat', async (req, res) => {
    const apiKey = 'live_YW54u6hJW5A4X3qAK4KPSzMazSfm9WeqlJe6p7RkYedD3pZOzon49PjQk3okKmCb'; // Reemplaza con tu API Key de TheCatAPI
    const url = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.status(200).send(response.data[0]); // Enviar la primera imagen en la respuesta
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
