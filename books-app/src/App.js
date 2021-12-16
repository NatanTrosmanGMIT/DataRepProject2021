import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Create from './components/create';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Read from './components/read';
import Edit from './components/edit';

// UI and navigation
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Navbar bg="dark" variant="dark">

            <Navbar.Brand> Books App </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Local Time</Nav.Link>
              <Nav.Link href="/read">Browse Books</Nav.Link>
              <Nav.Link href="/create">Add a Book</Nav.Link>
            </Nav>
          </Navbar>

          <br />
          <Switch>
            <Route path='/' component={Content} exact />
            <Route path='/create' component={Create} />
            <Route path='/read' component={Read} />
            <Route path='/edit/:id' component={Edit} exact></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
