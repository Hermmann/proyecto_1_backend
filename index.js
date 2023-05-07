const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const dotenv = require("dotenv")
dotenv.config();

const routerUser = require("./src/routes/user_route")
const routerRestaurant = require("./src/routes/restaurant_route")
const routerProduct = require("./src/routes/product_route")
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




// Conexión a MongoDB usando mongoose
mongoose
  .connect(
     process.env.MONGODB_URI 
 
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