import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    tickets : []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/tickets/');
      const tickets = await res.json();
      this.setState({
        tickets
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <div>
          Login:
          <form action="127.0.0.1:8000/api-auth/login" method="POST">
            Username: <input type="text" name="username"/>
            Password: <input type="password" name="password"/>
            <input type="submit"/>
          </form>
        </div>
        <div>
          <h1> Tickets </h1> <br/>
          {this.state.tickets.map(item => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <span> Category: {item.category} </span>
              <span> Status: {item.status}</span>
            </div>
          ))}
        </div>
        <div>
        Form
        </div>
      </div>
    );
  }
}

export default App;
