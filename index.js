const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



// MongoDB database connent
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u8edlcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    const productCollection = client.db('emaJohn').collection('products')

    app.get('/products', async(req, res)=>{
        const query = {}
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        const count = await productCollection.estimatedDocumentCount();
        res.send({count, products});
    })

  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('ema john server is running');
})

app.listen(port, ()=>{
    console.log(`ema john running on: ${port}`)
})