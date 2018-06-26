import React, { Component } from 'react';
import './App.css';
import { Button, Form, } from 'semantic-ui-react'


class LoginForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      csrf_token: '',
    };
  }

  componentDidMount(){
    const csrftoken = this.getCookie('csrftoken');
    this.setState({csrf_token: csrftoken});
  }

  getCookie(name) {
    if (!document.cookie) {
      return null;
    }

    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
      return null;
    }

    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }    

  //     let user = JSON.parse(localStorage.getItem('user'));

  render = () => {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} >
        Login: 
        <Form.Field>
          <label>Username</label>
          <input name='username' onChange = {(e) => this.handleChange(e)} value={this.state.username} placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name='password' onChange={(e) => this.handleChange(e)} value={this.state.password} type='password' placeholder='Password' />
        </Form.Field>
        <input type='submit'/>
      </Form>
    )     
  }
}


class App extends Component {
  state = {
    tickets : [],
    newticket : {
      title : '',
      description: '',
      category : '',
    }
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
          <LoginForm />
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
