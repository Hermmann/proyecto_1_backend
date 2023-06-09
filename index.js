const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const dotenv = require("dotenv")
dotenv.config();

const routerUser = require("./src/routes/user_route")
const routerRestaurant = require("./src/routes/restaurant_route")
const routerProduct = require("./src/routes/product_route");
const routerPedido = require('./src/routes/pedido_route');
mongoose.set('strictQuery', true);



// Creacion del app
const app = express()
app.get("/api", (req, res) => {
  res.send("API USER")
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routerUser)
app.use(routerRestaurant)
app.use(routerProduct)
app.use(routerPedido)




// Conexión a MongoDB usando mongoose
mongoose
  .connect(
    'mongodb+srv://' +
    process.env.MONGO_USER +
    ':' +
    process.env.MONGO_PASS +
    '@cluster0.uawvyf5.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
 
  )
  .then(() => {
    console.log('Connected.');
  })
  .catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
  });

// Middlewares
app.use(cors()); 
app.use(express.json());

// import empanadaRoutes from './empanada/empanada.routes'
// app.use('/empanada', empanadaRoutes)

// Endpoint para 404
app.use((req, res) => {
    res.status(404).json({ message: 'Not found.' });
  });
  
  // Inicia app en puerto 8080
  app.listen(8080, console.log('listen'));