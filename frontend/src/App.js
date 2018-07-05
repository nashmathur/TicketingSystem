import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
// import ReactDOM from "react-dom";
import './App.css';
import { Form, Grid, Segment, Dropdown, } from 'semantic-ui-react'


class LoginForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
//      key: '',
      csrfmiddlewaretoken: '',
    };
  }

  componentDidMount(){
    const csrftoken = this.getCookie('csrftoken');
    this.setState({csrfmiddlewaretoken: csrftoken});
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
    let formData = this.state;

    const url = 'http://127.0.0.1:8000/api-auth/login/';

    fetch(url, {
      credentials: 'include',
      method: 'post',
      mode: 'cors',
      headers: {
        //'Content-type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': this.state.csrfmiddlewaretoken,
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if(response.ok){
        console.log('ok');
        console.log('Request succeeded with JSON response', response);
        response.json().then(data => {
          console.log(data);
          this.setState({key : data.key});
          console.log(this.state);
        });
      }
      else{
        alert('Incorrect Credentials!');
        console.log('Request failed with JSON response', response);
      }
    });
  };    

  render = () => {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} >
        Login: 
        <Form.Field>
          <input name='csrftoken' value={this.state.csrfmiddlewaretoken} hidden />
        </Form.Field>
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

class TicketForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: '',
      csrftoken: '3SuttufPCH1Rc7X62ianSYyImEHsyWaEexCAo2shOKlNc1d95K0a0VoDutl5iHRH',
      username: 'nash',
      password: 'AdminPassword',
//      key : '0998dc5c74a33dafe2969ff104d5968afde08f62',
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let formData = this.state;

    const url = 'http://127.0.0.1:8000/tickets/';

    fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
       // "Content-type": "application/json"
        'Content-Type': 'application/x-www-form-urlencoded'

      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if(response.ok){
        console.log('ok');
        console.log('Request succeeded with JSON response', response);
      }
      else{
        console.log('Request failed with JSON response', response);
      }
    });
  };    


  render = () => {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} >
      <br/>
        <Form.Field>
          <label>Title</label>
          <input name='title' onChange = {(e) => this.handleChange(e)} value={this.state.title} placeholder='title' />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input name='description' onChange={(e) => this.handleChange(e)} value={this.state.description} placeholder='Description' />
        </Form.Field>
        <Form.Field>
          <label>Category: </label>
            <select name="category" onChange = {(e) => this.handleChange(e)}>
              <option value="Bug Report">Volvo</option>
              <option value="Feature Request">Fiat</option>
              <option value="Service Request">Audi</option>
            </select>
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
    },
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
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment>
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
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <TicketForm />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
      </div>
    );
  }
}

export default App;
