const express = require('express');
const morgan = require('morgan');
const app = express();
const {router,createConnection} = require('./routes/routes');

//Midlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/', router);

createConnection();


app.set('port',5001);
app.listen(app.get('port'),()=>{
    console.log(`servidor corriendo en el puerto 5001`);
});
