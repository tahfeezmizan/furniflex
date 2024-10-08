const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7utjicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (this establishes the connection)
        await client.connect();

        const productCollection = client.db('FurniFlexDB').collection('products');
        const cartsCollection = client.db('FurniFlexDB').collection('carts');


        app.get('/products', async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 0;
                const limit = parseInt(req.query.limit) || 6;
                const category = req.query.category || '';

                const skip = page * limit;

                let query = {};
                if (category) {
                    query = { category: category };
                }

                const result = await productCollection.find(query)
                    .skip(skip)
                    .limit(limit)
                    .toArray();

                res.send(result);
            } catch (error) {
                console.error("Failed to load products data:", error);
                res.status(500).send({
                    message: "Failed to load products data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });

        app.get('/productsCount', async (req, res) => {
            try {
                const count = await productCollection.countDocuments(); // Adjust based on your MongoDB setup
                res.send({ count });
            } catch (error) {
                console.error("Failed to fetch products count:", error);
                res.status(500).send({ message: "Failed to fetch products count." });
            }
        });


        app.get('/carts', async (req, res) => {
            try {
                const email = req.query.email;
                const query = { customerEmail: email }
                const result = await cartsCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error("Failed to load carts data:", error);
                res.status(500).send({
                    message: "Failed to load carts data.",
                    error: error.message || "Internal Server Error"
                });
            }
        })

        // Corrected carts post on DB
        app.post('/carts', async (req, res) => {
            try {
                const productItem = req.body;
                const result = await cartsCollection.insertOne(productItem);
                res.send(result);
            } catch (error) {
                console.error("Failed to add product to cart:", error);
                res.status(500).send({
                    message: "Failed to add product to cart.",
                    error: error.message || "Internal Server Error"
                });
            }
        });


        // delete own cart data by specific user
        app.delete('/carts/:email', async (req, res) => {
            try {
                const email = req.params.email;              
                const query = { customerEmail: email }
                const result = await cartsCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.error("Failed to load carts data:", error);
                res.status(500).send({
                    message: "Failed to load carts data.",
                    error: error.message || "Internal Server Error"
                });
            }
        });


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error while connecting to MongoDB:", error);
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('FurniFlex server is running');
});

app.listen(port, () => {
    console.log(`FurniFlex is running on port ${port}`);
});
