const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const dotenv = require("dotenv")
dotenv.config();
mongoose.set('strictQuery', true);



// Creacion del app
const app = express()
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
  app.listen(9500, console.log('listen'));