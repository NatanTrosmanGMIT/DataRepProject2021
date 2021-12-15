import React, { Component } from 'react';
import BookItem from './bookItem';

class Books extends Component {
    // this gets passed to read.js for displaying
    render() {
        return this.props.books.map((book) => {
            return <BookItem book={book} key={book._id} ReloadData={this.props.ReloadData}></BookItem>
        })
    }
}
export default Books;