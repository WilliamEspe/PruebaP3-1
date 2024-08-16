require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

app.use(bodyParser.json());

const productRoutes = require('./routes/products')(db);
app.use(productRoutes);

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const catRoutes = require('./routes/cat');
app.use(catRoutes);

const weatherRoutes = require('./routes/weather');
app.use(weatherRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
