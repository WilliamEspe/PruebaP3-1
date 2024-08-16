module.exports = function (db) {
    const express = require('express');
    const router = express.Router();

    // Crear Producto
    router.post('/products', async (req, res) => {
        try {
            const product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            };
    
            const docRef = await db.collection('products').add(product);
            res.status(201).send({ id: docRef.id });
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
    
    

    // Leer Productos
    router.get('/products', async (req, res) => {
        try {
            const productsSnapshot = await db.collection('products').get();
            const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Actualizar Producto
    router.put('/products/:id', async (req, res) => {
        try {
            const productRef = db.collection('products').doc(req.params.id);
            await productRef.update(req.body);
            res.status(200).send({ id: req.params.id });
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Eliminar Producto
    router.delete('/products/:id', async (req, res) => {
        try {
            const productRef = db.collection('products').doc(req.params.id);
            await productRef.delete();
            res.status(200).send({ id: req.params.id });
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    return router;
};
