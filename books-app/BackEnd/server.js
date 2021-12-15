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
        console.log("2222222222222222222222222222222")
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
    bookModel.find((err, data)=>{
        res.json(data);
    })
})

app.listen(port, () => {
    console.log(`Roger Roger, listening at http://localhost:${port}`)
})

// First step
app.get('/', (req, res) => {
    res.send('Welcome to My DR&P Project - Books');
})

// // display that info
// app.get('/api/books', (req, res) => {
//     const books = [
//         {
//             "Title": "Unlocking Android",
//             "Authour": "W. Frank Ableson",
//             "Cover": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
//         },
//         {
//             "Title": "Android in Action, Second Edition",
//             "Authour": "W. Frank Ableson",
//             "Cover": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg",
//         }

//     ];
//     res.json({
//         mybooks: books,
//         'Message': 'Data Sent from API'
//     })
// })

// // goes to html file
// app.get('/test', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })

// // display name after submition but shows in the html
// app.get('/book', (req, res) => {
//     console.log(`1111111111111111111`)
//     res.send('Book Title : ' + req.query.title + ' Authour Name(s): ' + req.query.authour)
// })

// // display name after submition but doesnt show in the html
// app.post('/name', (req, res) => {
//     console.log(`555555555555555555555`)
//     res.send('Book Title : ' + req.body.title + ' Authour Name(s): ' + req.body.authour)
// })
// // getting the name typed in the HTML
// app.get('/hello/:name', (req,res)=>{
//     console.log(req.params.name);
//     res.send('Hello '+req.params.name);
// })


