import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
// import ReactDOM from "react-dom";
import './App.css';
import { Button, Form, Grid, Segment, Dropdown, Label, Header, } from 'semantic-ui-react'


class LoginForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

    const url = 'api-auth/login/';

    fetch(url, {
      credentials: 'include',
      method: 'post',
      mode: 'cors',
      headers: {
        //'Content-type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': this.state.csrfmiddlewaretoken,
      },
      //body: JSON.stringify(formData),
      body: 'username='+formData.username+'&password='+formData.password+'&csrfmiddlewaretoken='+formData.csrfmiddlewaretoken,
    })
    .then(response => {
      if(response.ok){
        alert('Correct Credentials!');
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

	handleLogout = (e) => {
    e.preventDefault();
		
    const url = 'api-auth/logout/';

		fetch(url, {
      credentials: 'include',
      method: 'post',
      mode: 'cors',
      headers: {
        //'Content-type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': this.state.csrfmiddlewaretoken,
      },
    });
	};

  render = () => {
    return (
      
      <Form onSubmit={(e) => this.handleSubmit(e)} >
        <h2>Login:</h2> 
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
	      <Button positive type='submit'>Submit</Button>
        <Button negative onClick={(e) => this.handleLogout(e)} >Logout</Button>
      </Form>
    )     
  }
}

const categoryOptions = [ { key: 'Bug Report', value: 'Bug Report', text: 'Bug Report' },  { key: 'Feature Request', value: 'Feature Request', text: 'Feature Request' },  { key: 'Service Request', value: 'Service Request', text: 'Service Request' }, ];

class TicketForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: 'Bug Report',
			csrfmiddlewaretoken: '',
      domain: '',
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

  handleDropdown(e, data) {
    this.setState({[data.name]: data.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let formData = this.state;

    const url = 'tickets/';

    fetch(url, {
      credentials: 'include',
      method: 'post',
      mode: 'cors',
      headers: {
        //'Content-type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': this.state.csrfmiddlewaretoken,
      },
      body: 'title='+formData.title+'&description='+formData.description+'&category='+formData.category+'&domain='+formData.domain+'&csrfmiddlewaretoken='+formData.csrfmiddlewaretoken,
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
          <input name='title' onChange = {(e) => this.handleChange(e)} value={this.state.title} placeholder='Title' />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input name='description' onChange={(e) => this.handleChange(e)} value={this.state.description} placeholder='Description' />
        </Form.Field>
        <Form.Field>
          <label>Category: </label>
					<Dropdown name='category' placeholder='Category' onChange={(e, data) => this.handleDropdown(e, data)} value={this.state.category} fluid search selection options={categoryOptions} />
				</Form.Field>
				<Form.Group grouped>
					<label>Domain: </label>
					<Form.Field label='Public' control='input' type='radio' name='domain' value='public' onChange={(e) => this.handleChange(e)} value={this.state.domain} default />
					<Form.Field label='Private' control='input' type='radio' name='domain' value='private' onChange={(e) => this.handleChange(e)} value={this.state.domain} />
				</Form.Group>

				<Button positive type='submit'>Submit</Button>
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
      const res = await fetch('tickets/', {credentials: 'include'});
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
      <Header as='h1' color='violet' textAlign='center'> Ticketing System </Header>
      <div>
      <Segment color='red'>
        <LoginForm />
      </Segment>
      </div>
      <div>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment color='red'>
              <div>
                <h1> Tickets </h1> <br/>
                  {this.state.tickets.map(item => (
                    <div key={item.id}>
                    <h2>{item.title}</h2>
                    <Label as='a' color='purple' tag>
                      {item.category}
                    </Label>
                    <Label as='a' color='blue' tag>
                      {item.status}
                    </Label>
                    </div>
                  ))}
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color='red'>
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
