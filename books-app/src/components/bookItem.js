import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
class BookItem extends Component {

    constructor() {
        super();

        this.DeleteBook = this.DeleteBook.bind(this);
    }

    // refreshes the page and deletes the chosen Book
    DeleteBook(e) {
        e.preventDefault();
        console.log("Delete: " + this.props.book._id)

        axios.delete("http://localhost:4000/api/books/" + this.props.book._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch();
    }

    // this lays out everything correctly so we can display it
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.book.Title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.book.Cover} width="216" height="320"></img>
                            <footer className="blockquote-footer">
                                <br />
                                {this.props.book.Authour}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/" + this.props.book._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                    <br />
                </Card>
            </div>
        );
    }
}
export default BookItem;