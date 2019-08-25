const express = require('express');
const app = express();
const knex = require('./knex/knex.js');
const path = require('path'); 

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//require and use html routes
const htmlRoutes = require('./controller/routes/htmlRoutes'); 
app.use('/', htmlRoutes ); 

//require and use api routes
const apiRoutes = require('./controller/routes/apiRoutes'); 
app.use('/api', apiRoutes ); 







app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`connected on port ${PORT}`);
});