import React, { Component } from 'react';
import axios from 'axios';

// Basic create class
class Create extends Component {

    // Making sure to bind everything together
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
        this.onChangeAuthour = this.onChangeAuthour.bind(this);
        this.onChangeBookCover = this.onChangeBookCover.bind(this);
        this.state = {
            Title: '',
            Authour: '',
            Cover: ''
        }
    }

    // this is what handles the submission and shows that it went through
    handleSubmit(event) {
        console.log("Title: " + this.state.Title +
            "Authour: " + this.state.Authour +
            "Cover: " + this.state.Cover);

        const NewBook = {
            Title: this.state.Title,
            Authour: this.state.Authour,
            Cover: this.state.Cover
        }

        axios.post('http://localhost:4000/api/books', NewBook)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err);
            })

        event.preventDefault();
        this.setState({
            Title: '',
            Authour: '',
            Cover: ''
        });
    }
    // changes Title, Authour and Cover respectively
    onChangeBookTitle(event) {
        this.setState({
            Title: event.target.value
        })
    }
    onChangeAuthour(event) {
        this.setState({
            Authour: event.target.value
        })
    }
    onChangeBookCover(event){
        this.setState({
            Cover: event.target.value
        })
    }

    // 3 seperate parts for Title, Authour and Cover respectively and a submission button
    render() {
        return (
            <div>
                <h1>This is my Create Component!</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Add Book Title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.onChangeBookTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Book Authour: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Authour}
                            onChange={this.onChangeAuthour}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Book Cover: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Cover}
                            onChange={this.onChangeBookCover}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Add Book"
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Create;