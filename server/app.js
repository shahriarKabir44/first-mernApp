const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const expressSession = require('express-session')
const app = express();
var srvr = require('http').createServer(app)
var PORT = process.env.PORT || 4000;
var io = require('socket.io')(srvr, {
    cors: {
        origin: "*",
    },
})
srvr.listen(PORT)
const cors = require('cors')
const bodyparser = require('body-parser')
mongoose.connect('mongodb+srv://meme_lord:1234@cluster0.3sx7v.mongodb.net/boox?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    }
}));
app.use(bodyparser.json())
app.use(cors())
app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}));

io.on('connection', socket => {
    socket.on('mss', data => {
        socket.broadcast.emit('msg', data)
    })
    socket.on('addbook', data => {
        socket.broadcast.emit('newbook', data)
    })
})