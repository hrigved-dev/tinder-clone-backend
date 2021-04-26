//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
var Cards = require("./dbCards"); 
const Cors = require("cors");

//App Config
const app = express();
const connection_url = "mongodb+srv://admin:hrigvedk12@cluster0.1tsbe.mongodb.net/tinderDB?retryWrites=true&w=majority"

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const cardSchema = mongoose.Schema({
    name: String,
    imgUrl: String,
})

Cards = mongoose.model('cards', cardSchema);

//API Endpoints
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err,data) => {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data);
        }
    }
    )
});

//Listener
app.listen(8001, () => console.log("Server started at port 8001"));