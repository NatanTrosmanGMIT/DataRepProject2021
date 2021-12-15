import React, { Component } from 'react';
import Books from './books';
import axios from 'axios';

class Read extends Component {

    constructor() {
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    // reloads the page
    ReloadData() {
        axios.get('http://localhost:4000/api/books')
            .then((response) => {
                this.setState({ mybooks: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // get info from host 4000
    componentDidMount() {
        axios.get('http://localhost:4000/api/books')
            .then((response) => {
                this.setState({ mybooks: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // this is all the info we'll be displaying
    state = {
        mybooks: []
    };

    // this is where we display all the info thats read
    render() {
        return (
            <div>
                <h1>This is my Read Component.</h1>
                <Books books={this.state.mybooks} ReloadData={this.ReloadData}></Books>
            </div>
        );
    }
}
export default Read;