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
        {this.state.tickets.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
