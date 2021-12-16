// Imports
const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* sets the path to our index.html file and all the related 
   javascript necessary to serve our single page application*/
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// login details
const strConnection = 'mongodb+srv://admin:admin@cluster0.mgxeo.mongodb.net/books?retryWrites=true&w=majority';
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(strConnection);
}

// setting up the book schema
const bookSchema = new mongoose.Schema({
    Title: String,
    Authour: String,
    Cover: String
});

// compiling our schema into a model
const bookModel = mongoose.model('book', bookSchema);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// deletes books by searching for their id
app.post('/api/books/:id', (req, res) => {
    console.log("Delete Book: " + reqbody.id);

    bookModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data)
    });
});

// how we want books displayed
app.post('/api/books', (req, res) => {
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Authour);
    console.log(req.body.Cover);

    bookModel.create({
        Title: req.body.Title,
        Authour: req.body.Authour,
        Cover: req.body.Cover
    })
        .then()
        .catch();
    res.send('Data Sent to Server!')
});

// displays just the book connected to they id typed in
app.get('/api/books/:id', (req, res) => {
    console.log(req.params.id);

    bookModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

// displays the book data
app.get('/api/books', (req, res) => {
    bookModel.find((err, data) => {
        res.json(data);
    })

})

// goes and gets the data to delete a book
app.delete('/api/books/:id', (req, res) => {
    console.log('Deleteing : ' + req.params.id);

    bookModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            if (error)
                res.status(500).send(error)
            res.status(200).send(data);
        })
})

// goes and gets the data to edit a book
app.put('/api/books/:id', (req, res) => {
    console.log("Update book: " + req.params.id);
    console.log(req.body);

    bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })

})

app.get('/api/books', (req, res) => {
    bookModel.find((err, data) => {
        res.json(data);
    })
})


// for any request that isnt already above, this goes and gets anything we need from index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Roger Roger, listening at http://localhost:${port}`)
})

// First step
app.get('/', (req, res) => {
    res.send('Welcome to My DR&P Project - Books');
})