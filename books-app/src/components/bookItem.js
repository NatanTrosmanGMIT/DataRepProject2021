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

        axios.delete('http://localhost:4000/api/books/' + this.props.book._id)
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
                    <div>
                        <Card.Header>{this.props.book.Title}</Card.Header>
                    </div>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.book.Cover} width="216" height="320"></img>
                            <footer>
                                <br />
                                {this.props.book.Authour}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <div>
                        <Link to={"/edit/" + this.props.book._id} style={{ height: 45, width: 300 }} className="btn btn-dark">Edit</Link>
                        <Button variant="danger" style={{ height: 45, width: 300 }} onClick={this.DeleteBook}>Delete</Button>
                    </div><br />
                </Card>
            </div>
        );
    }
}
export default BookItem;