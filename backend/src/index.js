const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');

const { setupWebSocket } = require('./websocket')

const app = express();
const server = http.Server(app);
setupWebSocket(server);

//MongoDB 
mongoose.connect('mongodb+srv://brunopr:asdqwe123@cluster0-8eo6w.mongodb.net/dev-maps?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
server.listen(3333);
app.use(routes);

//HTTP Metods: GET, POST, PUT, DELETE
//Param methods:
// Query Params: req.query(filters, sorting, paging...)
// Route Params: req.params(Indentify an object to update or delete)
// Body: req.body (Data to create or update an object)