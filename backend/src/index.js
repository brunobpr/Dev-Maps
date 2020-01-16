const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

//MongoDB 
mongoose.connect('mongodb+srv://brunopr:asdqwe123@cluster0-8eo6w.mongodb.net/dev-maps?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express.json());
app.listen(3000);
app.use(routes);


//HTTP Metods: GET, POST, PUT, DELETE
//Param methods:
// Query Params: req.query(filters, sorting, paging...)
// Route Params: req.params(Indentify an object to update or delete)
// Body: req.body (Data to create or update an object)