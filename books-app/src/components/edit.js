import React, { Component } from 'react';
import axios from 'axios';

// Basic edit class
class Edit extends Component {

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
        // Puts together the Book info
        componentDidMount() {
            console.log(this.props.match.params.id);
            axios.get('http://localhost:4000/api/books/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        Title: response.data.Title,
                        Authour: response.data.Authour,
                        Cover: response.data.Cover,
                        _id: response.data._id
                    })
                })
                .catch();
        }

        
    // this is what handles the submission and shows that it went through
    handleSubmit(event) {
        console.log("Name: " + this.state.Title +
            " Authour: " + this.state.Authour +
            "Cover: " + this.state.Cover);

        const NewBook = {
            Title: this.state.Title,
            Authour: this.state.Authour,
            Cover: this.state.Cover,
            _id: this.state._id
        }

        // Displays the Book info to be edited
        axios.put('http://localhost:4000/api/books/' + this.state._id, NewBook)
        .then((response)=>{console.log(response)})
        .catch();

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
                <h1>The Correction</h1>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <label>Add Book Title: </label><br/>
                        <textarea type="text" cols="60" rows="1"
                            value={this.state.Title}
                            onChange={this.onChangeBookTitle}
                        /><br/><br/>
                    </div>
                    <div>
                        <label>Add Book Authour: </label><br/>
                        <textarea type="text" cols="60" rows="1"
                            value={this.state.Authour}
                            onChange={this.onChangeAuthour}
                        /><br/><br/>
                    </div>
                    <div>
                        <label>Add Book Cover: </label><br/>
                        <textarea type="text" cols="120" rows="2"
                            value={this.state.Cover}
                            onChange={this.onChangeBookCover}
                        /><br/><br/><br/>
                    </div>
                    <div>
                        <input type="submit" value="Add Book"
                            className="btn btn-dark"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Edit;